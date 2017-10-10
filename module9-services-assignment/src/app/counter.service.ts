export class CounterService {

  countActiveToInactive: number = 0;
  countInactiveToActive: number = 0;

  incrementCountActiveToInactive(){
    this.countActiveToInactive ++;
    console.log('incrementCountActiveToInactive: ' + this.countActiveToInactive);
  }
  incrementCountInactiveToActive(){
    this.countInactiveToActive ++;
    console.log('incrementCountInactiveToActive: ' + this.countInactiveToActive);
  }
}
