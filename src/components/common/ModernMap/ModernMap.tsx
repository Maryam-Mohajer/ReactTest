import React from "react";
import NeshanMap from "react-neshan-map-leaflet";
import { FallBackSpinner } from "../Spinner/FallBackSpinner/FallbackSpinner";

interface MyPropsType {
  mapStyle?: object;
  centerData?: any;
  zoom?: number;
  oneData?: any;
  popupData?: any;
  multipleData?: any;
  des1Label?: string;
  des2Label?: string;
  des3Label?: string;
  LinkLabel?: string;
  canMark?: boolean;
  setFieldValue?: any;
  feildName?: string;
  isloading?: boolean;
}

const ModernMap: React.FC<MyPropsType> = ({
  mapStyle,
  centerData,
  oneData,
  popupData,
  zoom,
  multipleData,
  des1Label,
  des2Label,
  des3Label,
  LinkLabel,
  canMark,
  setFieldValue,
  feildName,
  isloading,
}) => {
  return (
    <>
      {isloading ? (
        <div className="position-relative">
          <FallBackSpinner loadingStyle={{ top: "50%" }} setHeight={300} />
        </div>
      ) : (
        <NeshanMap
          style={mapStyle}
          options={{
            key: "web.dea819daac8c47c6884dd962495acae8",
            center: [
              centerData && centerData.lat !== null
                ? centerData.lat
                : "35.5555",
              centerData && centerData.lng !== null
                ? centerData.lng
                : "51.33333",
            ],
            zoom: zoom ? zoom : 13,
          }}
          onInit={(L: any, myMap: any) => {
            //one map data
            let marker = L.marker([
              oneData && oneData.lat && oneData.lat !== null ? oneData.lat : "",
              oneData && oneData.lng && oneData.lng !== null ? oneData.lng : "",
            ])
              .addTo(myMap)
              .bindPopup(
                popupData
                  ? `<p class="text-center m-0 font-weight-bold"> 
                        ${des1Label} : ${popupData.firstVal}
                      </p>` +
                      `<p class="text-center m-0 font-weight-bold"> 
                        ${des2Label} : ${popupData.secondVal}
                      </p>` +
                      `<a href=${`/FactoryLandingDetails/${popupData.linkVal}`} 
                        target="_blank"
                        class="text-primary text-center font-weight-bold d-block mx-auto"> 
                          ${LinkLabel}
                        </a>`
                  : "مکان شما ..."
              );
            // multiple map data
            multipleData &&
              multipleData.map((data: any) =>
                L.marker([
                  data.lat && data.lat !== null && data.lat,
                  data.lng && data.lng !== null && data.lng,
                ])
                  .addTo(myMap)
                  .bindPopup(
                    `<p class="text-center m-0 font-weight-bold">
                      ${des1Label} : ${data.name}
                    </p>` +
                      `<p class="text-center m-0 font-weight-bold">
                       ${des2Label} : ${data.memberShipTypeTitle}
                    </p>` +
                      `<p class="text-center m-0 font-weight-bold">
                       ${des3Label}  : ${
                        data.provinceTitle +
                        "-" +
                        data.countyTitle +
                        "-" +
                        data.cityOrVilageTitle
                      } </p>` +
                      `<a href=${`/FactoryLandingDetails/${data.factoryId}`} 
                      target="_blank" 
                      class="text-primary text-center font-weight-bold d-block mx-auto">
                        ${LinkLabel}
                    </a>`
                  )
              );

            myMap._size = null;

            //set pointer on map
            canMark &&
              setFieldValue &&
              myMap.on("click", function (e: any) {
                marker.setLatLng(e.latlng);
                setFieldValue(feildName, e.latlng);
              });
          }}
        />
      )}
    </>
  );
};

export { ModernMap };
