//src/components/ui/checkoutLayout.js
// Imports
import React from "react"; // React
import Link from "next/link";
//import CartBadge from "../CartBadge"; // Import cartBadge for prop drilling
import styles from "@/styles/uiStyle/Checkout.module.css";

const CheckoutUI = () => {

  // Placeholder form data state (no hooks used)
  const formData = {
    name: "",
    phone: "",
    address: "",
    notes: "",
  };

  const isValidPhone = /^[0-9]{10,15}$/.test(formData.phone);
  const isValid = formData.name && isValidPhone && formData.address;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    formData[id] = value; // Update placeholder form data
    console.log(`Updated formData:`, formData);
  };


  return (
    <div className={styles.container}>
    {/*  <CartBadge count={0} /> */} {/* Placeholder count */}
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.grid}>
          {/* Order Summary */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Order Summary</h2>
            <p className={styles.emptyCart}>Your cart is empty.</p>
          </div>

          {/* Delivery Details */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Delivery Details</h2>
            <form>
              {/* Name */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="name"
                  className={styles.input}
                  onChange={handleInputChange}
                />
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <input
                  type="tel"
                  id="phone"
                  className={styles.input}
                  onChange={handleInputChange}
                />
                <label htmlFor="phone" className={styles.label}>
                  Phone Number
                </label>
                {!isValidPhone && formData.phone && (
                  <div className={styles.error}>
                    Please enter a valid phone number.
                  </div>
                )}
              </div>

              {/* Address */}
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="address"
                  className={styles.input}
                  onChange={handleInputChange}
                />
                <label htmlFor="address" className={styles.label}>
                  Delivery Address
                </label>
              </div>

              {/* Notes */}
              <div className={styles.formGroup}>
                <textarea
                  id="notes"
                  className={styles.textarea}
                  placeholder="Delivery Notes (Optional)"
                  onChange={handleInputChange}
                />
                <label htmlFor="notes" className={styles.labelNote}>
                  Delivery Notes (Optional)
                </label>
              </div>

              {/* Proceed to Payment Button */}
              <Link href="/Payment">
              <button
                disabled={!isValid}
                className={styles.button}
              >
                Proceed to Payment
              </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutUI;
