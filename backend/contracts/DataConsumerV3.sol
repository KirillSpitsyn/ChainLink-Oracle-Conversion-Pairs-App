// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.7;
 
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
 
contract DataConsumerV3 {
 
    AggregatorV3Interface internal dataFeed1;
    AggregatorV3Interface internal dataFeed2;
    AggregatorV3Interface internal dataFeed3;
    AggregatorV3Interface internal dataFeed4;

    constructor() {
        dataFeed1 = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        dataFeed2 = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        dataFeed3 = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);  
        dataFeed4 = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);     
    }
 
    function getChainlinkDataFeedLatestAnswer(int pair) view public returns (int) {
        if(pair==1){
        (,int answer,,,) = dataFeed1.latestRoundData();
        return answer;
        } else if(pair==2){
        (,int answer,,,) = dataFeed2.latestRoundData();
        return answer;
        } else if(pair==3){
        (,int answer,,,) = dataFeed3.latestRoundData();
        return answer;            
        } else if(pair==4){
        (,int answer,,,) = dataFeed4.latestRoundData();
        return answer;            
        }
    }
}