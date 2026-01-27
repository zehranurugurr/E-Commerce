package com.ecommerce.store.config;

import com.ecommerce.store.entity.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    //Veritabanı işlemleri (ekleme, silme, güncelleme, sorgulama) gibi işlemleri programatik olarak yapma

    private EntityManager entityManager;

    @Value("${allowed.origins}")
    private String[] theAllowedOrigings;

    @Autowired
    public DataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};
             // HTTP Metotlarını Devre Dışı Bırakmak , entity’lere REST üzerinden sadece okuma (GET) izni
        disableHttpMethods(ProductCategory.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(State.class, config, theUnsupportedActions);
//        disableHttpMethods(Order.class, config, theUnsupportedActions);


        exposeIds(config);

        cors.addMapping(config.getBasePath()+"/**").allowedOrigins(theAllowedOrigings);

    }

    private static void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }


    //entity (varlık) ID'lerini görünür hale getirmek için metod
    private void exposeIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

    List<Class<?>> entityClasses = new ArrayList<>();


      for (EntityType<?> entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

      Class<?>[] domainTypes = entityClasses.toArray(new Class<?>[0]);

        config.exposeIdsFor(domainTypes);  // Spring Data REST JSON çıktılarında entity ID'lerini gizlediği için bu metod ile görünür yapıyoruz
    }
}
