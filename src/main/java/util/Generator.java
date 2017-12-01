package util;

/**
 *
 * @author Felipe Menezes
 */
public class Generator {
    
    public static String generateCnpj() {
        return null;
    }
    
    public static String randomString() {
        String letters = "abcdefghijklmnopqrstuvwxyz";
        int index;
        String result = "";
        for (int i = 0; i < 15; i++) {
            index = (int) (Math.random() * 26);
            char letter = letters.charAt(index);
            result += letter;
        } 
        return result;
    }
    
    public static void main(String[] args) {
        System.out.println(Generator.randomString());
    }
    
}