 class Product {
  
    String name;
    double price;
    int quantity;

    
    public Product(String name) {
        this.name = name;
        this.price = 0.0;       
        this.quantity = 0;      
           }

    
    public Product(String name, double price) {
        this.name = name;
        this.price = price;
        this.quantity = 0;      
           }

    public Product(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
            }

    public void displayProduct() {
        System.out.println(" Product Details:");
        System.out.println("Name     : " + this.name);
        System.out.println("Price    : " + this.price);
        System.out.println("Quantity : " + this.quantity);
    }
}
   class ProductDemo
   {
    public static void main(String[] args) {
        Product p1 = new Product("Notebook");
        p1.displayProduct();

        Product p2 = new Product("Pen", 10.5);
        p2.displayProduct();
        Product p3 = new Product("Backpack", 799.99, 3);
        p3.displayProduct();
    }
}