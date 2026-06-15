import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Logger logger = Logger.getInstance();
        Scanner sc = new Scanner(System.in);

        System.out.println("Type messages to log (type 'exit' to quit):");
        while (true) {
            System.out.print("> ");
            String input = sc.nextLine();
            if (input.equalsIgnoreCase("exit")) break;
            logger.log(input);
        }

        sc.close();
    }
}
