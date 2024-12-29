import * as tf from '@tensorflow/tfjs';

const preprocessDataset = (dataset) => {
  let sentences = [];
  let labels = [];
  let intents = [];

  // Iterate through conversations to extract inputs and responses
  dataset.forEach((data, pos) => {
    data.conversations.forEach((conversation, index) => {
      const intent = `intent_${pos * data.conversations.length + index}`;
      intents.push({ intent, responses: conversation.responses });

      conversation.user_inputs.forEach((input) => {
        sentences.push(input);
        labels.push(index); // Assign a unique label to each intent
      });
    });
  });

  return { sentences, labels, intents };
};

const tokenizeText = (sentences) => {
  const tokenizer = new Set();
  sentences.forEach((sentence) => {
    sentence.split(' ').forEach((word) => tokenizer.add(word.toLowerCase()));
  });
  return Array.from(tokenizer);
};

const encodeText = (sentences, vocabulary) => {
  return sentences.map((sentence) => {
    const encoded = Array(vocabulary.length).fill(0);
    sentence.split(' ').forEach((word) => {
      const index = vocabulary.indexOf(word.toLowerCase());
      if (index !== -1) encoded[index] = 1; // One-hot encode
    });
    return encoded;
  });
};

const trainModel = async (encodedSentences, labels, numClasses) => {
    try {
        const xs = tf.tensor2d(encodedSentences); // Features
        const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), numClasses); // One-hot labels

        const model = tf.sequential();
        model.add(tf.layers.dense({ inputShape: [encodedSentences[0].length], units: 16, activation: 'relu' }));
        model.add(tf.layers.dense({ units: numClasses, activation: 'softmax' }));

        model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

        await model.fit(xs, ys, { epochs: 100 });
        return model;
    }
    catch (err) {
        console.log('Error when training model:', err.message);
        return null;
    }
};

// const trainModel = async (encodedSentences, labels, numClasses) => {
//   // Normalize input data
//   const xs = tf.tensor2d(encodedSentences).div(tf.scalar(255)); // Scale input features
//   const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), numClasses); // One-hot encode labels

//   // Define the model
//   const model = tf.sequential();
//   model.add(tf.layers.dense({ inputShape: [encodedSentences[0].length], units: 64, activation: 'relu' }));
//   model.add(tf.layers.dropout({ rate: 0.3 })); // Dropout for regularization
//   model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
//   model.add(tf.layers.dropout({ rate: 0.3 })); // Another dropout layer
//   model.add(
//     tf.layers.dense({
//       units: numClasses,
//       activation: 'softmax',
//       kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }), // Add L2 regularization
//     })
//   );

//   // Compile the model
//   model.compile({
//     optimizer: tf.train.adam(0.001), // Adam optimizer with a reduced learning rate
//     loss: 'categoricalCrossentropy',
//     metrics: ['accuracy'],
//   });

//   // Train the model
//   const earlyStopping = tf.callbacks.earlyStopping({
//     monitor: 'val_loss',
//     patience: 5, // Stop training if no improvement for 5 epochs
//   });

//   await model.fit(xs, ys, {
//     epochs: 100, // Train for up to 100 epochs
//     batchSize: 16, // Use smaller batches
//     validationSplit: 0.2, // Use 20% of the data for validation
//     callbacks: [earlyStopping], // Add early stopping callback
//   });
//   return model;
// };

const predictIntent = (model, userInput, vocabulary, intents) => {
  const inputTokens = encodeText([userInput], vocabulary); // Encode input
  const inputTensor = tf.tensor2d(inputTokens);
  const predictions = model.predict(inputTensor);
  const predictedIndex = predictions.argMax(1).dataSync()[0]; // Get highest probability

  return intents[predictedIndex]; // Return the matched intent
};

// const predictIntent = (model, userInput, vocabulary, intents) => {
//   // Encode user input
//   const inputTokens = encodeText([userInput], vocabulary);
//   const inputTensor = tf.tensor2d(inputTokens);

//   // Model prediction with softmax
//   const predictions = model.predict(inputTensor).softmax();
//   const predictionValues = predictions.dataSync(); // Get all probabilities
//   const predictedIndex = predictions.argMax(1).dataSync()[0];
//   const confidence = predictionValues[predictedIndex]; // Confidence score

//   // Check confidence threshold
//   if (confidence < 0.7) {
//     return "I'm not sure I understand. Could you rephrase?";
//   }

//   // Return predicted intent with a random response
//   const intent = intents[predictedIndex];
//   const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
//   return response;
// };

export {
    preprocessDataset,
    tokenizeText,
    encodeText,
    trainModel,
    predictIntent
};