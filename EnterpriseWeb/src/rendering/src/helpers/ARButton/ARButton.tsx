import { useState } from 'react';
import classNames from 'classnames';
import { FaSms } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import ModalWrapper from 'src/helpers/ModalWrapper/ModalWrapper';
import { IconTypes, SvgIcon } from 'src/helpers/SvgIcon';
import { getEnum } from 'lib/utils';
import { useModelViewScript } from 'lib/utils/use-model-view-module';
// import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

const EMAIL_SUBJECT = 'Check out this product in Augmented Reality!';
const EMAIL_BODY =
  'Thanks for checking out Renewal by Andersen Augmented Reality! Click the link below to view our products in your home. https://www.andersenwindows.com/windows-and-doors/doors/french-doors-hinged-patio-doors/400-series-frenchwood-hinged-patio-door/Sent from Mail for Windows';

export type ARButtonProps = Foundation.EnterpriseWeb.Core.FieldSets.ARButton & {
  classes: {
    wrapper: string;
    cta1Classes: string;
  };
};

const ARButton = ({ fields, classes }: ARButtonProps): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isClickEmail, setIsClickEmail] = useState(false);

  const _icon = getEnum<IconTypes>(fields?.cta1Icon);
  useModelViewScript();

  const sendSMS = (phone: string) => {
    // const pendingClass = 'pending';
    // const doneClass = 'done';
    // const errorClass = 'error';

    const endpoint =
      location.protocol + '//' + location.hostname + '/api/aw/sharearlink/sendarlinkviatext';
    const data = {
      phone: phone,
      link: location.origin + location.pathname + '?ar=' + '',
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Data-Type': 'json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        const responseJSON = error.responseJSON;
        setMessage(responseJSON.Message);
      });
  };

  const handleClickSMS = () => {
    setMessage('');
    if (phone) {
      sendSMS(phone);
    } else {
      setMessage('Please enter a valid phone number.');
    }
  };

  const handleClickEmail = () => {
    setMessage('');
    if (email && email.includes('@')) {
      setIsClickEmail(true);
      window.location.href = `mailto:${email}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setIsClickEmail(false);
  };

  return (
    <>
      {showModal && (
        <ModalWrapper size="fluid" handleClose={handleClose}>
          <div className="p-4">
            <div className="flex min-h-[300px] min-w-[400px] justify-center">
              <model-viewer
                src={fields?.gltfLink?.value?.url}
                ios-src={fields?.usdzLink?.value?.src}
                poster={fields?.posterImage?.value?.url}
                alt="windows"
                exposure="0.008"
                camera-controls
                data-ar
                quick-look-browsers="safari chrome"
                camera-orbit="0deg 90deg"
                ar-modes="webxr"
                tabindex="0"
                ar-status="not-presenting"
                class="model-viewer"
              ></model-viewer>
              {/* <model-viewer
                id="viewer"
                shadow-intensity="1"
                src="https://rbawebsite-assets.azurewebsites.net/webassets/400Hinged.gltf"
                ios-src="https://rbawebsite-assets.azurewebsites.net/webassets/400Hinged.usdz"
                poster="https://aw930cdnprdcd.azureedge.net/-/media/andersenwindows/images/windows-and-doors/doors/patio-doors-hinged/400-series-frenchwood-hinged-doors/400_frenchwood_hinged_door-cat.png?modified=20171218194821"
                data-ar
                camera-controls=""
                quick-look-browsers="safari chrome"
                camera-orbit="0deg 90deg"
                class="model-viewer"
                ar-status="not-presenting"
              ></model-viewer> */}
            </div>
            <p className="mt-2 text-[14px]">
              *Unfortunately AR is not available on desktop devices. Please send to a mobile device
              via text message or email.
            </p>
            {message && <div className="my-2 text-[13px] text-red-500">{message}</div>}
            <div className="mt-4 hidden grid-cols-2 gap-2 md:grid">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="xxx-xxx-xxxx"
                  className="w-full rounded-sm border border-[#b9b9b9]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div
                  className="ml-2 flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-primary"
                  onClick={handleClickSMS}
                >
                  <FaSms size={25} color="white" />
                </div>
              </div>
              {!isClickEmail ? (
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-sm border border-[#b9b9b9]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    className="ml-2 flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-primary"
                    onClick={handleClickEmail}
                  >
                    <MdEmail size={25} color="white" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center">Thank you for your interest!</div>
              )}
            </div>
          </div>
        </ModalWrapper>
      )}
      <div
        className={classNames(
          classes?.wrapper,
          'mb-s flex items-start md:flex-row md:items-center md:space-x-4'
        )}
      >
        <button
          onClick={() => {
            setShowModal(true);
            setIsClickEmail(false);
          }}
          className={classNames(
            classes?.cta1Classes,
            'flex w-fit cursor-pointer items-center whitespace-nowrap rounded-lg border-4 border-theme-btn-border bg-theme-btn-bg px-m py-[9px] font-sans text-button font-heavy text-theme-btn-text disabled:border-gray disabled:text-gray'
          )}
        >
          <span>_CTA AR</span>
          <SvgIcon icon={_icon} className="ml-xxs" />
        </button>
      </div>
    </>
  );
};

export default ARButton;
