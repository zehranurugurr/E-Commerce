package com.ecommerce.store.repository;

import com.ecommerce.store.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// Anotasyon , Spring Data REST kütüphanesinde kullanılır ve bir JpaRepository arayüzüne eklenerek bu repository üzerinden otomatik olarak RESTful web servisleri oluşturulmasını sağlar.
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}