import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import React from "react";

const CartIcon = () => {
    return (
        <div className="relative flex h-6 w-6 items-center justify-center rounded-md border-spacing-9 border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
            <ShoppingCartIcon />
        </div>
    );
};

export default CartIcon;
