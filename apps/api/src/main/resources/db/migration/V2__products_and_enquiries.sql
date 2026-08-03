CREATE TABLE products (
    id UUID PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    category VARCHAR(120) NOT NULL,
    summary VARCHAR(800) NOT NULL,
    materials VARCHAR(500) NOT NULL,
    applications VARCHAR(800) NOT NULL,
    publication_status VARCHAR(30) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products (category);
CREATE INDEX idx_products_publication_status ON products (publication_status);

CREATE TABLE enquiries (
    id UUID PRIMARY KEY,
    reference_number VARCHAR(40) NOT NULL UNIQUE,
    enquiry_type VARCHAR(40) NOT NULL,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(180) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    country VARCHAR(100),
    product_slug VARCHAR(180),
    industry VARCHAR(120),
    message VARCHAR(5000) NOT NULL,
    consent_given BOOLEAN NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'NEW',
    source VARCHAR(80) NOT NULL DEFAULT 'WEBSITE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_enquiries_product_slug FOREIGN KEY (product_slug) REFERENCES products (slug)
);

CREATE INDEX idx_enquiries_status_created_at ON enquiries (status, created_at DESC);
CREATE INDEX idx_enquiries_email ON enquiries (email);

INSERT INTO products (id, name, slug, category, summary, materials, applications)
VALUES
('00000000-0000-0000-0000-000000000001', 'FRP Storage Tanks', 'frp-storage-tanks', 'Storage Equipment', 'Custom-engineered FRP storage tanks for corrosive industrial services.', 'FRP', 'Chemical storage|Water and wastewater|Process utilities'),
('00000000-0000-0000-0000-000000000002', 'PP and PPH Storage Tanks', 'pp-pph-storage-tanks', 'Storage Equipment', 'Fabricated polypropylene storage equipment for approved chemical duties.', 'PP|PPH', 'Chemical storage|Dosing systems|Process tanks'),
('00000000-0000-0000-0000-000000000003', 'HDPE Storage Tanks', 'hdpe-storage-tanks', 'Storage Equipment', 'Lightweight fabricated tanks for suitable storage and water applications.', 'HDPE', 'Water storage|Chemical storage'),
('00000000-0000-0000-0000-000000000004', 'PVDF Storage Tanks', 'pvdf-storage-tanks', 'Storage Equipment', 'High-purity thermoplastic storage equipment for reviewed process conditions.', 'PVDF', 'High-purity processes|Aggressive chemical service'),
('00000000-0000-0000-0000-000000000005', 'Reactors and Process Vessels', 'reactors-process-vessels', 'Process Equipment', 'Application-specific reactors and vessels in FRP, thermoplastics and dual laminate.', 'FRP|PPH|PVDF|Dual Laminate', 'Chemical processing|Reaction systems|Process containment'),
('00000000-0000-0000-0000-000000000006', 'Wet and Packed-Bed Scrubbers', 'wet-packed-bed-scrubbers', 'Pollution Control', 'Corrosion-resistant scrubbing systems configured for reviewed gas streams.', 'FRP|PPH|Dual Laminate', 'Fume extraction|Air pollution control|Process exhaust'),
('00000000-0000-0000-0000-000000000007', 'FRP Blowers', 'frp-blowers', 'Pollution Control', 'Corrosion-resistant blowers for compatible industrial exhaust duties.', 'FRP', 'Fume extraction|Scrubber systems|Ventilation'),
('00000000-0000-0000-0000-000000000008', 'Thermoplastic Piping Systems', 'thermoplastic-piping-systems', 'Piping Systems', 'Fabricated piping systems in approved thermoplastic materials.', 'PPH|HDPE|PVC|CPVC|PVDF', 'Chemical transfer|Water treatment|Process utilities'),
('00000000-0000-0000-0000-000000000009', 'Dual-Laminate Piping', 'dual-laminate-piping', 'Piping Systems', 'Thermoplastic-lined piping with FRP structural reinforcement.', 'Dual Laminate|PVDF|ECTFE|FRP', 'Aggressive chemicals|High-purity transfer|Process piping'),
('00000000-0000-0000-0000-000000000010', 'Pickling and Electroplating Tanks', 'pickling-electroplating-tanks', 'Custom Fabrication', 'Custom-fabricated tanks for reviewed surface-treatment processes.', 'PP|PPH|PVDF|FRP', 'Pickling lines|Electroplating|Surface treatment');
