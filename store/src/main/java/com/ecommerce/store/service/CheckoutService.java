package com.ecommerce.store.service;

import com.ecommerce.store.dto.Purchase;
import com.ecommerce.store.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}