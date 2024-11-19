import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import "../login/pages/Template.css";
// import ODSIcon from "oute-ds-icon";
import ODSButton from "oute-ds-button";
import ODSLabel from "oute-ds-label";
import { showAlert } from "oute-ds-alert";
export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        headerMsg,
        subHeadermsg,
        headerNode,
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        socialProvidersNode = null,
        infoNode = null,
        registerUrl,

        // documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = `Tiny Command`;
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? ""
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={"custom-body"}>
            {displayMessage &&
                message !== undefined &&
                (message.type !== "warning" || !isAppInitiatedAction) &&
                // <div
                //     className={clsx(
                //         `alert-${message.type}`,
                //         kcClsx("kcAlertClass"),
                //         `pf-m-${message?.type === "error" ? "danger" : message.type}`
                //     )}
                // >
                //     <div className="pf-c-alert__icon">
                //         {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                //         {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                //         {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                //         {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                //     </div>
                //     <span
                //         className={kcClsx("kcAlertTitleClass")}
                //         dangerouslySetInnerHTML={{
                //             __html: kcSanitize(message.summary)
                //         }}
                //     />
                // </div>

                showAlert({
                    type: message.type,
                    message: kcSanitize(message.summary),
                    showProgress: false
                })}

            <div className={"form-card"}>
                <div className="login-main">
                    <header className={kcClsx("kcFormHeaderClass")}>
                        {/* {enabledLanguages.length > 1 && (
                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                    <button
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                    >
                                        {currentLanguage.label}
                                    </button>
                                    <ul
                                        role="menu"
                                        tabIndex={-1}
                                        aria-labelledby="kc-current-locale-link"
                                        aria-activedescendant=""
                                        id="language-switch1"
                                        className={kcClsx("kcLocaleListClass")}
                                    >
                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )} */}
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <div className="login-heading">
                                    <ODSLabel children={headerMsg || headerNode} variant="h4" />
                                    <ODSLabel children={subHeadermsg} variant="body1" />
                                </div>
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                        <div className="kc-login-tooltip">
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );

                            if (displayRequiredFields) {
                                return (
                                    <div className={kcClsx("kcContentWrapperClass")}>
                                        <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                            <span className="subtitle">
                                                <span className="required">*</span>
                                                {msg("requiredFields")}
                                            </span>
                                        </div>
                                        <div className="col-md-10">{node}</div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </header>
                    <div id="kc-content">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {/* {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div
                                    className={clsx(
                                        `alert-${message.type}`,
                                        kcClsx("kcAlertClass"),
                                        `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                    )}
                                >
                                    <div className="pf-c-alert__icon">
                                        {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                        {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                        {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                        {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                    </div>
                                    <span
                                        className={kcClsx("kcAlertTitleClass")}
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </div>
                            )} */}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}
                        {socialProvidersNode}
                        {displayInfo && infoNode}
                        {kcContext.pageId == "login.ftl" && (
                            <div className="terms-and-policy">
                                <a href="https://www.tinycommand.com/terms-of-use" target="_blank">
                                    <ODSLabel
                                        children="Terms of Service"
                                        variant="body1"
                                        sx={{
                                            fontSize: "0.8rem",
                                            fontWeight: "400",
                                            color: "#2196F3"
                                        }}
                                    />
                                </a>
                                <span className="terms-line"></span>
                                <a href="https://www.tinycommand.com/privacy-policy" target="_blank">
                                    <ODSLabel
                                        children="Privacy Policy"
                                        variant="body1"
                                        sx={{
                                            fontSize: "0.8rem",
                                            fontWeight: "400",
                                            color: "#2196F3"
                                        }}
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                    {kcContext.pageId == "register.ftl" && (
                        <div className="footer">
                            <span className="footer-span">
                                <ODSLabel
                                    children="Already have an account?"
                                    variant="body2"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400"
                                    }}
                                />
                                <a href={url.loginUrl} style={{ textDecoration: "none" }}>
                                    <ODSButton
                                        variant="text"
                                        label="Sign In"
                                        size="small"
                                        sx={{ padding: "0px", fontSize: "0.8rem", fontWeight: "400" }}
                                    />
                                </a>
                            </span>
                        </div>
                    )}
                    {kcContext.pageId == "login.ftl" && (
                        <div className={"footer"}>
                            <div className={"already-have-acc"}>
                                <ODSLabel
                                    children="Do not have an account ? "
                                    variant="body2"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400"
                                    }}
                                />
                                <a tabIndex={8} href={registerUrl} style={{ textDecoration: "none" }}>
                                    {/* <ODSLabel
                                    variant="body2"
                                    children="Sign Up"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400",
                                        color: "#2196F3"
                                    }}
                                    // sx={{
                                    //     fontSize: "0.8rem",
                                    //     fontWeight: "400",
                                    //     padding: "0px",
                                    //     "&:hover": {
                                    //         backgroundColor: "#fff"
                                    //     }
                                    // }}
                                /> */}
                                    <ODSButton
                                        variant="text"
                                        label="Sign Up"
                                        size="small"
                                        sx={{ padding: "0px", fontSize: "0.8rem", fontWeight: "400" }}
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                    {kcContext.pageId == "login.ftl" && (
                        <div className="terms-and-policy">
                            <a href="https://www.tinycommand.com/terms-of-use" target="_blank">
                                <ODSLabel
                                    children="Terms of Service"
                                    variant="body1"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400",
                                        color: "#2196F3"
                                    }}
                                />
                            </a>
                            <span className="terms-line"></span>
                            <a href="https://www.tinycommand.com/privacy-policy" target="_blank">
                                <ODSLabel
                                    children="Privacy Policy"
                                    variant="body1"
                                    sx={{
                                        fontSize: "0.8rem",
                                        fontWeight: "400",
                                        color: "#2196F3"
                                    }}
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
