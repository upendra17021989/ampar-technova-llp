package com.ampartechnova.api.enquiry;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {
}
