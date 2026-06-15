import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter document type (word/pdf/excel): ");
        String input = sc.nextLine().toLowerCase();

        DocumentFactory factory;

       switch (input) {
    case "word":
        factory = new WordDocumentFactory();
        break;
    case "pdf":
        factory = new PdfDocumentFactory();
        break;
    case "excel":
        factory = new ExcelDocumentFactory();
        break;
    default:
        System.out.println("Invalid input.");
        sc.close();
        return;
}

        Document doc = factory.createDocument();
        doc.open();
        sc.close();
    }
}
