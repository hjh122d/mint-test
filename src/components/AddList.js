import { useState } from "react";

const INITIAL_INPUTS = {
  type: "",
  addAddress: "",
};

const AddList = ({
  onSubmit,
  onSubmitSuccess,
  listType,
  getListMerkleRoot,
}) => {
  //const [addAddress, setAddAddress] = useState("");
  const [inputs, setInputs] = useState(INITIAL_INPUTS);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", inputs.addAddress);
    formData.append("type", inputs.type);
    try {
      const result = await onSubmit(formData);

      console.log(result);
      const { data } = result;
      onSubmitSuccess(data);
      if (getListMerkleRoot) getListMerkleRoot();
      setInputs(INITIAL_INPUTS);
    } catch (error) {
      console.log(error);
      alert("추가 실패");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div></div>
      {listType === "airdrop" && (
        <input
          type="text"
          name="type"
          value={inputs.type}
          onChange={handleInputChange}
        />
      )}
      <input
        type="text"
        name="addAddress"
        value={inputs.addAddress}
        onChange={handleInputChange}
        size="42"
      />
      <button>추가</button>
    </form>
  );
};
export default AddList;
