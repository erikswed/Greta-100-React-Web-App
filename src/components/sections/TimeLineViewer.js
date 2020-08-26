import React from "react";
import Masonry from "../masonry/Masonry";
import VerticalMasonry from "../masonry/VerticalMasonry";
import ItemRenderer from "../masonry/ItemRenderer";
import albums from "../../albumData.json";
import { max, map, compact, last } from "lodash";

class TimeLineViewer extends React.Component {

  constructor(props) {
    super(props);
    this.photosArr = []
    this.currentAlbum = 0
  }

  state = {
    columns: 3,
    items: [],
    gutter: 16,
    outerGutter: true,
    debug: true,
    vertical: true,
    currentPath: 1,
    photosArr: [],
    albumLength: 0,
 
  };

  render() {
    // console.log(JSON.stringify(albums));
    const { albumIndex } = this.props;
    // Dont render if album request does not exist in the map, albumIndex is not in the map or less then 0 ..LOL
    if( albumIndex < 1 || albumIndex == undefined)
        return null;
    const _ = require('lodash'); 
    let items =_.find(albums, {weekNumber: String(albumIndex)})
    items = items.media;
    // const { data: items } = albums.find((album) => album.route == albumIndex);
    this.currentAlbum = albumIndex;
    const {
      width,
      gutter,
      outerGutter,
      debug,
      vertical,
      fullscreen
    } = this.state;
    console.log(this.props.location)
    // this.getPhotos( this.props.location.state.week);
    const LeComponent = vertical ? Masonry : VerticalMasonry;

    return (
      <div>
        <div
          style={{
            position: fullscreen && "absolute",
            zIndex: 2
          }}
        >
          <label htmlFor="gutter">Gutter</label>
          <input
            id="gutter"
            type="number"
            step={1}
            min={0}
            max={32}
            value={gutter}
            onChange={e => {
              this.setState({
                gutter: parseInt(e.target.value)
              });
            }}
          />
          <button
            onClick={() => this.setState({ outerGutter: !outerGutter })}
          >
            Outer Gutter: {outerGutter ? "On" : "Off"}
          </button>
          <button onClick={() => this.setState({ debug: !debug })}>
            debug
            </button>
          <button onClick={() => this.setState({ vertical: !vertical })}>
            {vertical ? "Vertical" : "Horizontal"}
          </button>
          <button onClick={() => this.setState({ width: 360 })}>360</button>
          <button onClick={() => this.setState({ width: 480 })}>480</button>
          <button onClick={() => this.setState({ width: 640 })}>640</button>
          <button onClick={() => this.setState({ width: 728 })}>728</button>
          <button onClick={() => this.setState({ width: 960 })}>960</button>
          <button onClick={() => this.setState({ width: "100%" })}>
            100%
            </button>
          <button onClick={() => this.setState({ fullscreen: !fullscreen })}>
            {fullscreen ? "Fullscreen off" : "Fullscreen on"}
          </button>
        </div>
        <div
          style={{
            width,
            height: !fullscreen && 600,
            position: fullscreen ? "initial" : "relative",
            margin: "0 auto"
          }}
        >
          <LeComponent
            infinite
            items={items}
            itemRenderer={ItemRenderer}
            gutter={gutter}
            outerGutter={outerGutter}
            extraPx={0}
            debug={debug}
            rows={{
              0: 1,
              320: 2,
              480: 3,
              640: 4
            }}
            cols={{
              0: 1,
              360: 2,
              640: 2,
              960: 3,
              1280: 4,
              1400: 5,
              1720: 6,
              2040: 7,
              2360: 8
            }}
            onEnd={() => {
              // this.addItems();
            }}
          />
          {/* <style>
              {`body {
                background-color:  white;
              }`}
            </style> */}
        </div>
      </div>
    );
  }
}
export default TimeLineViewer;
