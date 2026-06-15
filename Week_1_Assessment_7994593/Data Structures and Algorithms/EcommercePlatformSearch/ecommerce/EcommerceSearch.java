package ecommerce;

import java.util.Arrays;
import java.util.Comparator;

public class EcommerceSearch {

    public static Product linearSearch(Product[] products, String name) {
        for (Product product : products) {
            if (product.productName.equalsIgnoreCase(name)) {
                return product;
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] products, String name) {
        int left = 0, right = products.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            int comparison = products[mid].productName.compareToIgnoreCase(name);

            if (comparison == 0) {
                return products[mid];
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return null;
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product(301, "T-shirt", "Apparel"),
            new Product(302, "Headphones", "Electronics"),
            new Product(303, "Coffee Maker", "Home Appliances"),
            new Product(304, "Notebook", "Stationery"),
            new Product(305, "Sneakers", "Footwear"),
            new Product(306, "Backpack", "Accessories"),
            new Product(307, "Smartphone", "Electronics"),
            new Product(308, "Water Bottle", "Fitness"),
            new Product(309, "Desk Lamp", "Home Decor"),
            new Product(310, "Bluetooth Speaker", "Electronics")
        };

        Product[] sortedProducts = Arrays.copyOf(products, products.length);
        Arrays.sort(sortedProducts, Comparator.comparing(p -> p.productName.toLowerCase()));

        String searchTerm = "Smartphone";

        Product result1 = linearSearch(products, searchTerm);
        System.out.println("Linear Search Result: " + (result1 != null ? result1 : "Not Found"));

        Product result2 = binarySearch(sortedProducts, searchTerm);
        System.out.println("Binary Search Result: " + (result2 != null ? result2 : "Not Found"));
    }
}
