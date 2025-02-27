// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProposerVote{

    enum PropsStatus{None, Created, Accepted, Pending}

    struct Proposal{
        string name;
        string description;
        uint16 voteCount;
        address[] voters;
        uint16 quorum;
        PropsStatus status;
    }

    mapping(address voter => mapping( uint8 indexProps => bool )) hasVoted;

        Proposal[]  public proposals;
        
        // event
        event ProposalCreated(string indexed name, uint16 quorum);

        event ProposalApproved(string indexed name, uint16 count);

        event ProposalActive(string indexed name, uint16 count);

     function createProposals(string memory _name, string memory _desc,  uint16 _quorum) external {
        require(msg.sender != address(0) , 'Zero address is not allow');

        Proposal memory newProposal;
        newProposal.name = _name;
        newProposal.description = _desc;
        newProposal.quorum = _quorum;
        newProposal.status = PropsStatus.Created;

        proposals.push(newProposal);

        emit ProposalCreated (_name, _quorum);
}

    function voteProposals(uint8 _index) external{
        require(msg.sender != address(0), 'Zero address is not allowed');
        require(_index < proposals.length,'index is out of bounds');
         require(!hasVoted [msg.sender][_index], 'You have already voted');

         Proposal storage currentProposal = proposals[_index];
         require(currentProposal.status != PropsStatus.Accepted, 'You have already accepted');

        currentProposal.voteCount += 1;
        currentProposal.voters.push(msg.sender);
        currentProposal.status = PropsStatus.Pending;

         hasVoted[msg.sender][_index] = true;

        if(currentProposal.voteCount >= currentProposal.quorum) {
            currentProposal.status = PropsStatus.Accepted;
            emit ProposalApproved(currentProposal.name, currentProposal.voteCount);
        }else{
           
           emit ProposalActive(currentProposal.name, currentProposal.voteCount);
            
        }

}
function getAllProposals() external view returns( Proposal[] memory) {
 return proposals;
} 

function getProposals(uint8 _index) external view 
    returns(string memory name_, string memory desc_, uint16 quorum_,
     address[] memory voters_, uint16 count_, PropsStatus status_) {
         require(_index < proposals.length,'index is out of bounds');

        require(msg.sender != address(0), 'Zero address not allowed');

        Proposal memory  currentProposal = proposals[_index];
        name_= currentProposal.name;
        desc_ = currentProposal.description;
        count_ = currentProposal.voteCount;
        voters_ = currentProposal.voters;
        quorum_ = currentProposal.quorum;
        status_ = currentProposal.status;
}


}