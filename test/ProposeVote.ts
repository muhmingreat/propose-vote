import { ethers } from "hardhat";
import { expect } from "chai";

describe("ProposerVote Contract", function () {
  let ProposerVote: any;
  let proposerVote: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    ProposerVote = await ethers.getContractFactory("ProposerVote");
    [owner, addr1, addr2] = await ethers.getSigners();
    proposerVote = await ProposerVote.deploy();
    await proposerVote.deployed();
  });

  describe("Proposal Creation", function () {
    it("should create a proposal with the correct details", async function () {
      await proposerVote.connect(owner).createProposals("Proposal 1", "First proposal description", 5);
      const proposals = await proposerVote.getAllProposals();

      expect(proposals.length).to.equal(1);
      expect(proposals[0].name).to.equal("Proposal 1");
      expect(proposals[0].description).to.equal("First proposal description");
      expect(proposals[0].quorum).to.equal(5);
      expect(proposals[0].status).to.equal(0); // PropsStatus.Created
    });

    it("should emit the ProposalCreated event", async function () {
      await expect(proposerVote.createProposals("Proposal 2", "Second proposal", 10))
        .to.emit(proposerVote, "ProposalCreated")
        .withArgs("Proposal 2", 10);
    });

    it("should revert if proposal creator is zero address", async function () {
      await expect(proposerVote.connect(ethers.constants.AddressZero)
        .createProposals("Invalid Proposal", "Should fail", 5)
      ).to.be.revertedWith('Zero address is not allow');
    });
  });

  describe("Voting on Proposals", function () {
    beforeEach(async function () {
      await proposerVote.connect(owner).createProposals("Proposal 1", "First proposal description", 2);
    });

    it("should allow a user to vote and increment the vote count", async function () {
      await proposerVote.connect(addr1).voteProposals(0);
      const proposal = await proposerVote.getProposals(0);
      
      expect(proposal.voteCount).to.equal(1);
      expect(proposal.status).to.equal(2); // PropsStatus.Pending
      expect(proposal.voters).to.include(addr1.address);
    });

    it("should emit the correct events when voting", async function () {
      await expect(proposerVote.connect(addr1).voteProposals(0))
        .to.emit(proposerVote, "ProposalActive")
        .withArgs("Proposal 1", 1);
      
      await proposerVote.connect(addr2).voteProposals(0);
      await expect(proposerVote.connect(addr2).voteProposals(0))
        .to.emit(proposerVote, "ProposalApproved")
        .withArgs("Proposal 1", 2);
    });

    it("should update the proposal status to Accepted if quorum is reached", async function () {
      await proposerVote.connect(addr1).voteProposals(0);
      await proposerVote.connect(addr2).voteProposals(0);

      const proposal = await proposerVote.getProposals(0);
      expect(proposal.status).to.equal(1); // PropsStatus.Accepted
    });

    it("should prevent double voting by the same user", async function () {
      await proposerVote.connect(addr1).voteProposals(0);
      await expect(proposerVote.connect(addr1).voteProposals(0)).to.be.revertedWith("You have already voted");
    });

    it("should revert voting if the proposal is already accepted", async function () {
      await proposerVote.connect(addr1).voteProposals(0);
      await proposerVote.connect(addr2).voteProposals(0); // Quorum reached, proposal accepted

      await expect(proposerVote.connect(addr2).voteProposals(0)).to.be.revertedWith("You have already accepted");
    });

    it("should revert if voting on a non-existent proposal", async function () {
      await expect(proposerVote.connect(addr1).voteProposals(999)).to.be.revertedWith('index is out of bounds');
    });
  });

  describe("Querying Proposals", function () {
    it("should return all proposals", async function () {
      await proposerVote.createProposals("Proposal 1", "First proposal description", 5);
      await proposerVote.createProposals("Proposal 2", "Second proposal description", 10);
      const proposals = await proposerVote.getAllProposals();

      expect(proposals.length).to.equal(2);
      expect(proposals[0].name).to.equal("Proposal 1");
      expect(proposals[1].name).to.equal("Proposal 2");
    });

    it("should return correct details of a proposal", async function () {
      await proposerVote.createProposals("Proposal 1", "First proposal description", 5);
      const proposal = await proposerVote.getProposals(0);

      expect(proposal.name_).to.equal("Proposal 1");
      expect(proposal.desc_).to.equal("First proposal description");
      expect(proposal.quorum_).to.equal(5);
      expect(proposal.count_).to.equal(0);
      expect(proposal.status_).to.equal(0); // PropsStatus.Created
    });

    it("should revert if querying a non-existent proposal", async function () {
      await expect(proposerVote.getProposals(999)).to.be.revertedWith('index is out of bounds');
    });
  });
});
