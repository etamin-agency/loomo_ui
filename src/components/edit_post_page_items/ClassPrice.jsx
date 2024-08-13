import React, { useState, useEffect } from "react";
import { TextField, FormControl, Select, MenuItem } from "@mui/material";

const PriceInput = ({ price, setPrice, error, helperText }) => {
    const [currency, setCurrency] = useState("USD");
    const [localPrice, setLocalPrice] = useState(price || "");

    useEffect(() => {
        setLocalPrice(price);
    }, [price]);

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setLocalPrice(value);
        validatePrice(value);
    };

    const validatePrice = (value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            setPrice("");
        } else {
            setPrice(numValue);
        }
    };

    const getCurrencySymbol = () => {
        switch (currency) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "GBP":
                return "£";
            default:
                return "";
        }
    };

    const inputWidth = 100;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                    value={localPrice}
                    onChange={handlePriceChange}
                    type="number"
                    size="small"
                    placeholder="200"
                    error={!!error}
                    InputProps={{
                        startAdornment: <span>{getCurrencySymbol()}</span>,
                        inputProps: { min: 0 },
                    }}
                    style={{ width: inputWidth }}
                />

                <FormControl style={{ marginLeft: 10 }}>
                    <Select
                        value={currency}
                        onChange={handleCurrencyChange}
                        size="small"
                    >
                        <MenuItem value="USD">USD</MenuItem>
                        <MenuItem value="EUR">EUR</MenuItem>
                        <MenuItem value="GBP">GBP</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {error && <div style={{ color: "red" }}>{helperText}</div>}
        </div>
    );
};

export default PriceInput;
