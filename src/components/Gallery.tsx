import type { Work } from "../types/types"
import "./Gallery.scss"

type GalleryProps = {
    filtered: Work[]
    
}


const Gallery = ({ filtered }: GalleryProps) => {

    return (
        <div className="gallery">
            {filtered.map((work) => (
                <figure key={work.id} className="gallery__item" data-id={work.id}>
                    <img className="gallery__img" src={work.imageUrl} alt={work.title} />
                  <figcaption className="gallery__caption">{work.title}</figcaption>
                </figure>
            ))}
        </div>
    )
}

export default Gallery
