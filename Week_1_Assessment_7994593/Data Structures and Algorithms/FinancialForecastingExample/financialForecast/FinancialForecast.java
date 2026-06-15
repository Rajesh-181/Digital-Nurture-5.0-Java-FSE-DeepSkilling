package financialForecast;

import java.util.Scanner;

public class FinancialForecast {

    public static double predictFutureValue(double currentValue, double growthRate, int years) {
        if (years == 0) {
            return currentValue;
        }
        double nextValue = predictFutureValue(currentValue, growthRate, years - 1);
        return nextValue * (1 + growthRate);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the current value: ");
        double currentValue = scanner.nextDouble();

        System.out.print("Enter the annual growth rate (in %): ");
        double growthRatePercent = scanner.nextDouble();
        double growthRate = growthRatePercent / 100;

        System.out.print("Enter the number of years: ");
        int years = scanner.nextInt();

        double futureValue = predictFutureValue(currentValue, growthRate, years);
        System.out.printf("Predicted future value after %d years: %.2f%n", years, futureValue);

        scanner.close();
    }
}
