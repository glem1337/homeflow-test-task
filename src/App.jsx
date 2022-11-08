import { useCallback, useEffect, useMemo, useState } from 'react';

import Header from './Header';
import PropertyCard from './PropertyCard';

function App() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const fetchPropertyData = async () => {
      const response = await fetch('/property-data.json');
      const json = await response.json();

      setProperties(json.result.properties.elements);
    };

    fetchPropertyData();
  }, []);

  /**
   * Computed properties
   * @type {Array}
   */
  const computedProperties = useMemo(
    () =>
      properties
        .map((property) => ({
          ...property,
          isSaved: savedProperties.includes(property.property_id),
        }))
        .filter((property) =>
          property.display_address.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    [searchQuery, properties, savedProperties],
  );

  /**
   * On search callback handler
   * @param event {Object}
   */
  const onSearchHandler = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  /**
   * On save handler callback creator
   * @param propertyId {Number}
   * @return {(function(): void)|*}
   */
  const onSaveHandlerCreator = useCallback(
    (propertyId) => () => {
      const isSaved = savedProperties.includes(propertyId);

      if (isSaved) {
        setSavedProperties(savedProperties.filter((id) => id !== propertyId));
        return;
      }

      setSavedProperties([...savedProperties, propertyId]);
    },
    [savedProperties],
  );

  return (
    <div className="container mx-auto my-5">
      <Header onSearch={onSearchHandler} />
      <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!!computedProperties &&
          computedProperties.map((property) => (
            <PropertyCard
              key={property.property_id}
              property={property}
              onSave={onSaveHandlerCreator(property.property_id)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
