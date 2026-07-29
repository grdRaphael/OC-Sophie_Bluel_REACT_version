import './Filters.scss'
import type { Category } from '../../types/types'


type FiltersProps = {
    filterId: number | null
    setFilterId: (category: number | null) => void
    categories: Category[]
}

const Filters = ({filterId, setFilterId, categories}: FiltersProps) => {
    return (
        <section>
            <div className="filters">
                <button className={`filters__btn ${filterId === null ? "filters__btn--active" : ""}`}
                    onClick={() => {setFilterId(null)}}
                >Tous</button>
                {categories.map((category) => (
                    <button className={`filters__btn ${filterId === category.id ? "filters__btn--active" : ""}`}
                        key={category.id}
                        onClick={() => setFilterId(category.id)}
                    >{category.name}
                    </button>
                ))}
            </div>
        </section>


    )
}

export default Filters