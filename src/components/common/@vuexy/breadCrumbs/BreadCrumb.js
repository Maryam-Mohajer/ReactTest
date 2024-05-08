import React from "react";
import { Home } from "react-feather";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";


class BreadCrumbs extends React.Component {
  render() {
    return (
      <div className="content-header row pl-1" >
        <div className="content-header-left col-md-9 col-12 mb-sm-0 mb-1">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              {this.props.breadCrumbTitle ? (
                <h2 className="breadcrumb-header-title float-left mb-0">
                  {this.props.breadCrumbTitle}
                </h2>
              ) : (
                ""
              )}
              <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb tag="ol">
                  <BreadcrumbItem tag="li">
                    <NavLink to="/">
                      <Home className={`align-top`} size={15}/>
                    </NavLink>
                  </BreadcrumbItem>

                  {this.props.parentLink ? (
                    <BreadcrumbItem tag="li">
                      <NavLink to={this.props.parentLink} >
                        {this.props.breadCrumbParent}
                      </NavLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem tag="li" >
                      {this.props.breadCrumbParent}
                    </BreadcrumbItem>
                  )}

                  {this.props.breadCrumbParent2 ? (
                    <BreadcrumbItem tag="li">
                      <NavLink
                        to={
                          this.props.parentLink2 ? this.props.parentLink2 : "#"
                        }
                      >
                        {this.props.breadCrumbParent2}
                      </NavLink>
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  {this.props.breadCrumbParent3 ? (
                    <BreadcrumbItem tag="li">
                      <NavLink
                        to={
                          this.props.parentLink3 ? this.props.parentLink3 : "#"
                        }
                      >
                        {this.props.breadCrumbParent3}
                      </NavLink>
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  {this.props.breadCrumbActive && (
                    <BreadcrumbItem tag="li" >
                      {this.props.breadCrumbActive}
                    </BreadcrumbItem>
                  )}
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
