pragma solidity ^0.5.0;
contract Drone{

    uint public taskcount = 0;

    struct Drone {

        uint id;
        string latlong;
        string status;
        bool completed;

    }
    mapping(uint => Drone) public tasks;
    constructor() public{
        createTask("Person struck at lat: 12.9716° N, long: 77.5946° E","status:active");
    }
    function createTask(string memory _latlong,string memory _status) public {
        taskcount ++;
        tasks[taskcount]= Drone(taskcount, _latlong, _status,false);

        }
    

}