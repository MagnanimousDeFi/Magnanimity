# Magnanimity
A digital donation DApp that pools cryptocurrency donations and dynamically allocates funds based on the occurrences and severity of natural disasters.

## Setup Instructions

1. Clone the repo
```
git clone https://github.com/MagnanimousDeFi/Magnanimity.git
```

2. Install truffle
```
npm install -g truffle
```

3. Install HDWalletProvider and Dotenv
```
npm install --save dotenv @truffle/hdwallet-provider
```
4. Create a copy of `.env.example` named `.env` and add your secret keys.
5. Run the following on the command line to compile the contracts. (This will compile the contract(s) and save the resulting JSON file(s) to `/frontend/ethereum/contracts`
```
truffle compile -all
```

6. To deploy the contract to Rinkeby run `truffle deploy --network rinkeby`
7. Navigate to the frontend folder and start the next server with the following commands.
```
cd frontend
npm install
npm run dev
```
8. The server will start running at `localhost:3000`
