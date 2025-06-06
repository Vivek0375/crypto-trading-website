package com.eco.service;

import com.eco.domain.PaymentMethod;
import com.eco.domain.PaymentOrderStatus;
import com.eco.modal.PaymentOrder;
import com.eco.modal.User;
import com.eco.repository.PaymentOrderRepository;
import com.eco.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl  implements PaymentService{

    @Autowired
   private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")  // Fixed: Added missing }
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecretKey;

    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
        PaymentOrder paymentOrder=new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long Id) throws Exception {

        return paymentOrderRepository.findById(Id).orElseThrow(
                ()->new Exception("payment order not found")
        );
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {

        if(paymentOrder.getStatus()==null){
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }
        if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)){
            if(paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)){
                RazorpayClient razorpay=new RazorpayClient(apiKey,apiSecretKey);
                Payment payment=razorpay.payments.fetch(paymentId);

                Integer amount=payment.get("amount");
                String status=payment.get("status");

                if(status.equals("captured")){
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                    return  true;
                }
                paymentOrder.setStatus(PaymentOrderStatus.FAILED);

                paymentOrderRepository.save(paymentOrder);

                return false;
            }
            paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);

            paymentOrderRepository.save(paymentOrder);

            return true;
        }
        return false;
    }


    @Override
    public PaymentResponse createRazorPaymentLink(User user, Long amount,Long orderId) throws RazorpayException {
        if(apiKey == null || apiSecretKey == null) {
            throw new RazorpayException("Razorpay API keys are not configured");
        }

        Long Amount=amount*100;
        try {
            // Initialize Razorpay client
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);

            // Create payment link request
            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount ); // Razorpay expects amount in paise
            paymentLinkRequest.put("currency", "INR");

            // Customer details
            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());

            paymentLinkRequest.put("customer", customer);

            // Notification settings
            JSONObject notify = new JSONObject();

            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("reminder_enable", true);


            // Add callback URLs
            paymentLinkRequest.put("callback_url", "http://localhost:5173/wallet?order_id=" + orderId);
            paymentLinkRequest.put("callback_method", "get");

            // Create payment link
            PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

            String paymentLinkId=payment.get("id");
            String paymentLinkUrl=payment.get("short_url");

            // Prepare response
            PaymentResponse response = new PaymentResponse();
            response.setPayment_url(paymentLinkUrl);

            return response;

        } catch (RazorpayException e) {
            System.out.println("Razorpay payment link creation failed"+ e.getMessage());
            throw new RazorpayException("Failed to create payment link: " + e.getMessage());
        }
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {
            // Set Stripe API key
            Stripe.apiKey = stripeSecretKey;

            // Create payment session parameters
            SessionCreateParams params = SessionCreateParams.builder()
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:5173/wallet/success?order_id=" + orderId)
                    .setCancelUrl("http://localhost:5173/wallet/cancel?order_id=" + orderId)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(amount * 100) // Stripe uses cents
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Order #" + orderId)
                                                                    .setDescription("Payment for order " + orderId)
                                                                    .build()
                                                    )
                                                    .build()
                                    )
                                    .build()
                    )

                    .build();

            // Create Stripe checkout session
            Session session = Session.create(params);

            // Create and return response
            PaymentResponse response = new PaymentResponse();

            response.setPayment_url(session.getUrl());



            return response;

    }
}
