package com.eco.service;

import com.eco.domain.PaymentMethod;
import com.eco.modal.PaymentOrder;
import com.eco.modal.User;
import com.eco.response.PaymentResponse;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long Id) throws Exception;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder,String paymentId) throws RazorpayException;

    PaymentResponse createRazorPaymentLink(User user, Long amount,Long orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount,Long orderId) throws StripeException;

}
