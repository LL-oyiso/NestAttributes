import React, { useState } from 'react';
import PropTypes from 'prop-types';

const dataTypes = ['string', 'number', 'boolean', 'null', 'binary', 'map', 'list'];

export const AttributeForm = ({ attribute, onUpdate }) => {
  const [dataType, setDataType] = useState(attribute.dataType || 'string');

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
    onUpdate({ ...attribute, dataType: e.target.value });
  };

  const handleAddKeyValuePair = () => {
    const newKeyValuePair = { key: '', value: '' };
    onUpdate({ ...attribute, value: [...(attribute.value || []), newKeyValuePair] });
  };

  const handleKeyValueChange = (index, key, value) => {
    const newValue = [...(attribute.value || [])];
    newValue[index] = { ...newValue[index], [key]: value };
    onUpdate({ ...attribute, value: newValue });
  };

  const handleAddElement = () => {
    onUpdate({ ...attribute, value: [...(attribute.value || []), ''] });
  };

  const handleElementChange = (index, value) => {
    const newValue = [...(attribute.value || [])];
    newValue[index] = value;
    onUpdate({ ...attribute, value: newValue });
  };

  const handleAddNestedMap = () => {
    const newNestedMap = { key: '', value: {} };
    onUpdate({ ...attribute, value: [...(attribute.value || []), newNestedMap] });
  };

  const handleNestedMapChange = (index, key, value) => {
    const newValue = [...(attribute.value || [])];
    newValue[index] = { ...newValue[index], [key]: value };
    onUpdate({ ...attribute, value: newValue });
  };

  const handleAddNestedList = () => {
    const newNestedList = { key: '', value: [] };
    onUpdate({ ...attribute, value: [...(attribute.value || []), newNestedList] });
  };

  const handleNestedListChange = (index, value) => {
    const newValue = [...(attribute.value || [])];
    newValue[index] = { ...newValue[index], value };
    onUpdate({ ...attribute, value: newValue });
  };

  return (
    <div className="p-4 border border-gray-300 rounded shadow">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={attribute.name}>
        {attribute.name}
      </label>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={attribute.name}
        value={dataType}
        onChange={handleDataTypeChange}
      >
        {dataTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {dataType === 'map' && (
        <div className="mt-4">
          {(attribute.value || []).map((keyValuePair, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="block appearance-none w-1/2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Key"
                value={keyValuePair.key}
                onChange={(e) => handleKeyValueChange(index, 'key', e.target.value)}
              />
              <input
                type="text"
                className="block appearance-none w-1/2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Value"
                value={keyValuePair.value}
                onChange={(e) => handleKeyValueChange(index, 'value', e.target.value)}
              />
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddKeyValuePair}>
            Add Key-Value Pair
          </button>
        </div>
      )}
      {dataType === 'list' && (
        <div className="mt-4">
          {(attribute.value || []).map((element, index) => (
            <input
              key={index}
              type="text"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Element"
              value={element}
              onChange={(e) => handleElementChange(index, e.target.value)}
            />
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddElement}>
            Add Element
          </button>
        </div>
      )}
      {dataType === 'binary' && (
        <div className="mt-4">
          <input
            type="file"
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  onUpdate({ ...attribute, value: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      )}
      {dataType === 'map' && (
        <div className="mt-4">
          {(attribute.value || []).map((nestedMap, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Key"
                value={nestedMap.key}
                onChange={(e) => handleNestedMapChange(index, 'key', e.target.value)}
              />
              <AttributeForm attribute={{ name: 'value', value: nestedMap.value }} onUpdate={(updatedNestedMap) => handleNestedMapChange(index, 'value', updatedNestedMap)} />
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddNestedMap}>
            Add Nested Map
          </button>
        </div>
      )}
      {dataType === 'list' && (
        <div className="mt-4">
          {(attribute.value || []).map((nestedList, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Name"
                value={nestedList.name}
                onChange={(e) => handleNestedListChange(index, 'name', e.target.value)}
              />
              <AttributeForm attribute={{ name: 'value', value: nestedList.value }} onUpdate={(updatedNestedList) => handleNestedListChange(index, 'value', updatedNestedList)} />
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddNestedList}>
            Add Nested List
          </button>
        </div>
      )}
    </div>
  );
}

AttributeForm.propTypes = {
  attribute: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AttributeForm;