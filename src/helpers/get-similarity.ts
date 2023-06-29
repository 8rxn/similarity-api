function termFreqMap(str: string) {
  var words = str.split("");
  var termFreq: Record<string, number> = {};
  words.forEach(function (w) {
    termFreq[w] = (termFreq[w] || 0) + 1;
  });
  return termFreq;
}

function addKeysToDict(
  map: Record<string, number>,
  dict: Record<string, boolean>
) {
  for (var key in map) {
    dict[key] = true;
  }
}

function termFreqMapToVector(
  map: Record<string, number>,
  dict: Record<string, boolean>
) {
  var termFreqVector = [];
  for (var term in dict) {
    termFreqVector.push(map[term] || 0);
  }
  return termFreqVector;
}

function vecDotProduct(vecA: number[], vecB: number[]) {
  var product = 0;
  for (var i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function vecMagnitude(vec: number[]) {
  var sum = 0;
  for (var i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

function similarityValue(vecA: number[], vecB: number[]) {
  return vecDotProduct(vecA, vecB) / (vecMagnitude(vecA) * vecMagnitude(vecB));
}

const cosineSimilarity = (text1: string, text2: string) => {
  var termFreqA = termFreqMap(text1);
  var termFreqB = termFreqMap(text2);
  var dict = {};
  addKeysToDict(termFreqA, dict);
  addKeysToDict(termFreqB, dict);
  var termFreqVecA = termFreqMapToVector(termFreqA, dict);
  var termFreqVecB = termFreqMapToVector(termFreqB, dict);

  return similarityValue(termFreqVecA, termFreqVecB);
};


export default cosineSimilarity;