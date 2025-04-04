import React from "react";
import { calculateShippingRates } from "../api/server";

const ShippingCalculator = () => {
    const handleCalculate = async () => {
        const shipmentPayload = {
            shipment: {
                address_from: { city: "700000", district: "701200" },
                address_to: { city: "850000", district: "850500" },
                parcel: { cod: "500000", weight: "220", width: "10", height: "15", length: "15" },
            },
        };

        try {
            const rates = await calculateShippingRates(shipmentPayload);
            console.log("Shipping rates:", rates);
            // Xử lý dữ liệu tính cước tại đây...
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="delivery-date">
            Dự kiến giao hàng{" "}
            <span className="fw-bolder">Thứ 2 - 06/01</span>
        </div>
    );
};

export default ShippingCalculator;