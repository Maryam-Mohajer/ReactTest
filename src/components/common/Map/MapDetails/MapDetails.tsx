import {
  GoogleMap,
  InfoBox,
  InfoWindow,
  LoadScriptNext,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
// import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { MarkerInfoView } from "../MarkerInfoView/MarkerInfoView";
import $ from "jquery";
import "./MapDetails.scss";
import Styles from "./MapWrapper.module.scss";

interface IPropTypes {
  onClick?: (lat: number | undefined, lng: number | undefined) => any;
}

const MapDetails: FC<IPropTypes> = ({ onClick }) => {
  const [marker, setMarker] = useState<any>();
  const targetNode = document.body;
  const nodeConfig = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList: any, observer: any) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        $('div[style*="background-color: rgba(0, 0, 0, 0.5)"]').remove();
        $(
          'div[style*="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 1;"]'
        ).remove();
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, nodeConfig);

  return (
    <FormGroup
      className={Styles.Wrapper}
      style={{ height: "95%", width: "100%", marginBottom: "0" }}
    >
      <LoadScriptNext
        id="script-loader"
        googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
        language="en"
        region="us"
        libraries={["geometry"]}
        // loadingElement={<FallBackSpinner />}
        version="weekly"
      >
        <GoogleMap
          mapTypeId="hybrid"
          mapContainerClassName="App-map"
          center={
            marker
              ? { lat: marker.lat, lng: marker.lng }
              : {
                  lat: 35.7,
                  lng: 51.3,
                }
          }
          zoom={8}
          onClick={(event) => {
            onClick && onClick(event.latLng?.lat(), event.latLng?.lng());
            setMarker({
              lat: event.latLng?.lat(),
              lng: event.latLng?.lng(),
            });
          }}
        >
          {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        </GoogleMap>
      </LoadScriptNext>
    </FormGroup>
  );
};

export { MapDetails };
