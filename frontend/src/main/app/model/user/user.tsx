class User {
  private a;
  constructor() {
    this.a = "1";
  }

  test():void{
    this.a = '4';
    console.log(this.a);
  }
}
export default User;
