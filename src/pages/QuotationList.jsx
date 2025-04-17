import React, { useState } from 'react'
import RequestQuotationListing from '../components/listing/RequestQuotationListing';

export default function QuotationList() {
      const [search, setSearch] = useState('');
    
    const quotations = [
        {
          id: 1,
          image: "https://via.placeholder.com/150",
          name: "John Doe",
          email: "john@example.com",
          location: "New York",
          companyName: "TechCorp",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/150",
          name: "Jane Smith",
          email: "jane@example.com",
          location: "California",
          companyName: "InnovateX",
        },
      ];
  return (
    <div>
         <RequestQuotationListing quotations={quotations} search={search} />
   
    </div>
  )
}
