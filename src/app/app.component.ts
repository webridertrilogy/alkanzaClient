import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapas';

  // linearModel: tf.Sequential;
  // prediction: any;

  // ngOnInit() {
  //   this.train();
  // }

  // async train(): Promise<any> {

    
  //   console.log(per);

  //   const p = tf.randomUniform([9], 1, 10, 'int32');
  //   // Define a model for linear regression.
  //   console.log(tf.randomUniform([9], 1, 10, 'int32').print());
  //   console.log(tf.randomNormal([9], 1, 10, 'int32').print());

  //   const x = tf.tensor1d([1, 2, 3, 4]);

  //   var h = x.logSumExp().print();  // or tf.logSumExp(x)
  //   console.log('p', h);

  //   this.linearModel = tf.sequential();
  //   this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));

  //   // Prepare the model for training: Specify the loss and the optimizer.
  //   this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

  //   // Training data, completely random stuff
  //   const xs = tf.tensor1d([3.2, 4.4, 5.5]);
  //   const ys = tf.tensor1d([1.6, 2.7, 3.5]);

  //   // Train
  //   await this.linearModel.fit(xs, ys);
  //   console.log(this.linearModel);
  //   console.log('model trained!');
  // }

  // predict(val: string) {
  //   // tslint:disable-next-line: radix
  //   const valNew = parseInt(val);
  //   const output = this.linearModel.predict(tf.tensor2d([valNew], [1, 1])) as any;
  //   this.prediction = Array.from(output.dataSync());
  //   console.log(this.prediction);
  // }


}
