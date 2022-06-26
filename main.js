const SHA256 = require('crypto-js/sha256');


class Block {
  constructor( previousHash = "", data) {
    this.timestamp = new Date();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.mineVar = 0;
  }

  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.mineVar).toString();
  }

  mine(difficulty) {
      while(!this.hash.startsWith("0".repeat(difficulty))) {
          this.mineVar++;
          this.hash = this.calculateHash();
      }
  }
}



class BlockChain {
    constructor(difficulty) {
        const genesisBlock = new Block('0000', {isgenesis: true})
        this.difficulty = difficulty;
        this.chain = [genesisBlock];
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data) {
        const lastBlock = this.getLastBlock();
        const newBlock = new Block(lastBlock.hash, data)
        console.log('start mining');
        console.time('mine');
        newBlock.mine(this.difficulty);
        console.timeEnd('mine');
        console.log('end mining');
        this.chain.push(newBlock);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

const testChain = new BlockChain(6);

testChain.addBlock({
    from: 'tung',
    to: 'Ha',
    amount: 100,
});

testChain.addBlock({
    from: 'tung',
    to: 'Mai',
    amount: 400,
});


console.log(testChain);
console.log('chain valid', testChain.isValid());
// console.log(JSON.stringify(savjeeCoint, null, 4));
