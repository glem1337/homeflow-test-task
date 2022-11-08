import { FaBookmark } from 'react-icons/fa';
import classNames from 'classnames';

function PropertyCard({ property, onSave }) {
  const imageUrl = property.photos[0];

  return (
    <div className="flex flex-col border-2 bg-gray-50">
      <div className="relative flex justify-center items-center flex-1">
        {imageUrl && (
          <img src={`https://mr0.homeflow.co.uk/${imageUrl}`} alt={property.display_address} />
        )}
        {!imageUrl && <div className="py-24">There no image</div>}
        <button
          className="absolute top-0 right-2"
          title="Click to bookmark this property"
          onClick={onSave}
        >
          <FaBookmark
            className={classNames({
              'text-red-400': property.isSaved,
              'text-yellow-400': !property.isSaved,
            })}
            size="40"
          />
        </button>
        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">
          {property.price}
        </p>
      </div>
      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
