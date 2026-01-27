package com.ecommerce.store.service.impl;

import com.ecommerce.store.dto.Purchase;
import com.ecommerce.store.dto.PurchaseResponse;
import com.ecommerce.store.entity.Customer;
import com.ecommerce.store.entity.Order;
import com.ecommerce.store.entity.OrderItem;
import com.ecommerce.store.repository.CustomerRepository;
import com.ecommerce.store.service.CheckoutService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        String email = customer.getEmail();

        Customer customerFromDB = customerRepository.findByEmail(email);

        if(Objects.nonNull(customerFromDB)){
            customer = customerFromDB;
        }

        customer.add(order);

        customerRepository.save(customer);

        PurchaseResponse response = new PurchaseResponse();
        response.setOrderTrackingNumber(orderTrackingNumber);
        return response;

    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }
}