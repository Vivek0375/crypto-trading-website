package com.eco.modal;

import com.eco.domain.verificationType;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class TwoFactorAuth {
    private boolean isEnable=false;
    private verificationType sendTo;
}
