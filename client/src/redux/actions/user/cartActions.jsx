import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@common/api";
import { appJson } from "@common/configurations";

// Fetching whole cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (rc, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/cart`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

// Deleting whole cart
export const deleteEntireCart = createAsyncThunk(
  "cart/deleteEntireCart",
  async (id, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/user/cart/${id}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

// Deleting one item from the cart
export const deleteOneProduct = createAsyncThunk(
  "cart/deleteOneProduct",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequest(
      "delete",
      `/user/cart/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

// Incrementing the count of one product
export const incrementCount = createAsyncThunk(
  "cart/incrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/user/cart-increment-quantity/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

// Decrementing the count of one product
export const decrementCount = createAsyncThunk(
  "cart/decrementCount",
  async ({ cartId, productId }, { rejectWithValue }) => {
    return commonReduxRequest(
      "patch",
      `/user/cart-decrement-quantity/${cartId}/item/${productId}`,
      {},
      appJson,
      rejectWithValue
    );
  }
);

// Applying coupon to cart
export const applyCoupon = createAsyncThunk(
  "cart/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    return commonReduxRequest(
      "post",
      `/user/coupon-apply`,
      { code: couponCode },
      appJson,
      rejectWithValue
    );
  }
);

// Removing existing coupon of a cart

export const removeCoupon = createAsyncThunk(
  "cart/removeCoupon",
  async (_, { rejectWithValue }) => {
    return commonReduxRequest(
      "get",
      `/user/coupon-remove`,
      {},
      appJson,
      rejectWithValue
    );
  }
);
