# Challenge 3 - Recently Viewed Products

## Initial Approach

Use an array to store recently viewed product IDs.

### Time Complexity
- Searching for an existing product: O(k)
- Updating history: O(k)
- k = number of recently viewed products

### Space Complexity
- O(k)

## Optimized Approach

Use a Set for fast product existence checking and an Array to maintain the viewing order.

The history is limited to 5 products.

### Time Complexity
- Set lookup: O(1) average
- Updating ordered history: O(k)
- Since k is limited to 5, this is effectively O(1)

### Space Complexity
- O(k), where k ≤ 5

## Features

- View product details in a modal
- Recently viewed products appear first
- Duplicate products are avoided
- History is limited to 5 products
- Remove History button
- Empty-state UI
- Responsive design