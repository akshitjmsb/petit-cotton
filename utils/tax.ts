type Province = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export const TAX_RATES: Record<Province, number> = {
    AB: 0.05, // GST
    BC: 0.12, // GST + PST
    MB: 0.12, // GST + PST
    NB: 0.15, // HST
    NL: 0.15, // HST
    NS: 0.15, // HST
    NT: 0.05, // GST
    NU: 0.05, // GST
    ON: 0.13, // HST
    PE: 0.15, // HST
    QC: 0.14975, // GST + QST
    SK: 0.11, // GST + PST
    YT: 0.05, // GST
};

export const PROVINCES: { code: Province; name: string }[] = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' },
];

export const calculateTax = (subtotal: number, province: string) => {
    const rate = TAX_RATES[province as Province] || 0;
    return {
        taxAmount: subtotal * rate,
        rate: rate
    };
};
