import {React,Component} from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../component/collection-preview/collection-preview.component";

class ShopPage extends Component {

    constructor(props){
        super(props);
        this.state = {
                collections:SHOP_DATA
        }
    }

    render()
    {
        const {collections}= this.state;
        return(
        <div className='shopPage'>
          {collections.map(
              ({id, ...otherCollectionProps}) => (
              <CollectionPreview key={id} {...otherCollectionProps}/>
          ))}
        </div>
        );
    }
}

export default ShopPage;