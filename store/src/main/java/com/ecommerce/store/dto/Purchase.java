package com.ecommerce.store.dto;


import com.ecommerce.store.entity.Address;
import com.ecommerce.store.entity.Customer;
import com.ecommerce.store.entity.Order;
import com.ecommerce.store.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}