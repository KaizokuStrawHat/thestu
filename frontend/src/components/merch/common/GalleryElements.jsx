export default function GalleryElements({varieties, setImageValue}){
    function renderGalleryElements(varieties) {
        const pictures = varieties.map(item => item.picture)
        
        const renderedPictures = pictures.map((picture, index) => (
          <img key={index} src={picture} className="w-[15%]" alt={`Picture ${index}`} onClick={() => setImageValue(picture)}/>
        ));

        // if Gallery elements are < 6, render a filler
        const initialElements = 6;
        const fillersNeeded = initialElements - pictures.length;
        const fillerDivs = Array.from({ length: fillersNeeded }, (_, index) => (
          <div key={`filler-${index}`} className="w-[15%] bg-gray-200"> {/* Placeholder */} </div>
        ));
      
        // if > 6, enable Carousel (NOT IMPLEMENTED YET)

        return renderedPictures.concat(fillerDivs);
    }

    return(
        <div className="mt-4 mb-4 flex gap-2 justify-evenly">
            {renderGalleryElements(varieties)}
        </div>
    )
}