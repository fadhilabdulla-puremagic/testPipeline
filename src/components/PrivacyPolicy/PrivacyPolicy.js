import {React, useEffect} from 'react'
import './app.css';
import { metaTags } from '../../context/actions/metaTags';
import i18n from '../../i18n/i18n';

export const PrivacyPolicy = () => {

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1,3)
    meta_tags.then(res => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    })

  }, []);



  return (
    <div className="site-wrap">
        {/*<a href="https://upgrade-skills.com"><img className="card-img-top" src="https://upgrade-skills.com/pix/upgradelogo.jpg" alt="Card image cap" /></a>*/}
        <h2>{i18n.t('PrivacyPolicy')}</h2>
        <h4>{i18n.t('PrivacyIntroduction')}</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacyWelcometoUpgradeSkillsPrivacyPolicy')}
        </p>
        <h4>1. {i18n.t('PrivacyWebsiteVisitorsHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacyWebsiteVisitorsDescription')}
        </p>
        <h4>2. {i18n.t('PrivacySecurityofPersonalInformationHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacySecurityofPersonalInformationDescription1')}:
        </p><ul style={{listStyleType: 'upper-latin'}}>
          <li>
            <p style={{textAlign: 'justify'}}>
              {i18n.t('PrivacySecurityofPersonalInformationDescription2')}
            </p>
          </li>
          <li>
            <p style={{textAlign: 'justify'}}>{i18n.t('PrivacySecurityofPersonalInformationDescription3')}</p>
          </li>
          <li>
            <p style={{textAlign: 'justify'}}>{
              i18n.t('PrivacySecurityofPersonalInformationDescription4')
            }
            </p>
          </li>
          <li>
            <p style={{textAlign: 'justify'}}>
              {i18n.t('PrivacySecurityofPersonalInformationDescription5')}
            </p>
          </li>
          <li>
            <p style={{textAlign: 'justify'}}>{i18n.t('PrivacySecurityofPersonalInformationDescription6')}</p>
          </li>
        </ul>
        <p />
        <h4>3.{i18n.t('PrivacyGatheringofPersonallyIdentifyingInformationHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacyGatheringofPersonallyIdentifyingInformationDescription')}</p>
        <h4>4. {i18n.t('PrivacyGatheringofCreditCarddetailsHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacyGatheringofCreditCarddetailsDescription')}</p>
        <h4>5. {i18n.t('PrivacyAdvertisementsHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacyAdvertisementsDescription')}</p>
        <h4>6. {i18n.t('PrivacyAgelimitconcerningusageofUpgradeSkills')}</h4>
        <p style={{textAlign: 'justify'}}>{i18n.t('PrivacyAgelimitconcerningusageofUpgradeSkillsDescription')}</p>
        <h4>7. {i18n.t('PrivacyLinksToExternalSites')}</h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacyLinksToExternalSitesDescription')}
        </p>
        <h4>8. {i18n.t('PrivacyAggregatedStatisticsCollectionHeading')}:</h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacyAggregatedStatisticsCollectionDescription')}
        </p>
        <h4>9. {i18n.t('PrivacySurveyandoptoutOptionHeading')}</h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacySurveyandoptoutoptionDescription')}
        </p>
        <h4>10. {i18n.t('PrivacyCookiesHeading')} </h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacyCookiesDescription')}
        </p>
        <h4>11. {i18n.t('PrivacyPolicyChangesHeading')}</h4>
        <p style={{textAlign: 'justify'}}>
          {i18n.t('PrivacyPolicyChangesDescription')}
        </p>
        <h4>12. {i18n.t('PrivacyContactInformationHeading')}</h4>
        <p style={{textAlign: 'justify'}}>{
          i18n.t('PrivacyContactInformationDescription')
        }
        </p>
        <br />
      </div>
  )
}


