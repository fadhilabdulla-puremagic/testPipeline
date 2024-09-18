import {React, useEffect} from 'react'
import './app.css';
import { metaTags } from '../../context/actions/metaTags';

export const TermsAndConditions = () => {

  useEffect(() => {
    // scroll to the top of the page on mount
    window.scrollTo(0, 0);

    // Call the updateMetaTags function with the dynamic values
    const meta_tags = metaTags(1,4)
    meta_tags.then(res => {
      if (window.updateMetaTags) {
        window.updateMetaTags(res.tag, res.description);
      }
    })

  }, []);



  return (
    <div className="site-wrap terms-conditions">
        <h2>Terms and Conditions</h2>
        <p>These Terms of Service govern your access to and use of the Ed-Tech Platform website ("Upgrade skills") provided by [Pure Magic Exhibition and Conference Organizing]. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with these Terms, please refrain from accessing or using the Website.</p>
        <h4>1 - Acceptance of Terms</h4>
        <p>By accessing or using the Website, you represent that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. These Terms constitute a legally binding agreement between you and the Company.
        </p>
        <h4>2 - Use of the Website</h4>

        <h4>2.1 Account Registration</h4>
        <p>To access certain features or services on the Website, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for any activity that occurs under your account.
        </p>
        <h4>2.2 Content Submission</h4>
        <p>If you are a trainer or training institute, you may submit learning content to the Website for publication. By submitting content, you grant the Company a non-exclusive, worldwide, license to use, and display the content on the Website. You represent and warrant that you have the necessary rights and permissions to grant this license.
        </p>
        <h4>2.3 Prohibited Conduct</h4>
        <p>You agree not to:</p>
        <ul>
            <li>Use the Website for any illegal, unauthorized, or prohibited purpose.</li>
            <li>Upload, post, or transmit any content that is unlawful, harmful, offensive, defamatory, or infringing upon the rights of others.</li>
            <li>Engage in any activity that could interfere with or disrupt the functioning of the Website or its services.</li>
            <li>Use any automated means, such as bots or scripts, to access or scrape the Website's content.</li>
            <li>Attempt to gain unauthorized access to any part of the Website, user accounts, or other systems or networks connected to the website.</li>
        </ul>

        <h4>3 - Intellectual Property Rights</h4>
        <p>The Website and its content, including but not limited to text, graphics, logos, images, videos, and software, are owned or licensed by the Company and are protected by intellectual property laws. You may not use, reproduce, modify, distribute, or display any content from the Website without the prior written consent of the Company.
        </p>

        <h4>4 - Third-Party Content and Links</h4>

        <p>The Website may contain links to third-party websites, services, or resources that are not owned or controlled by the Company. The Company is not responsible for the availability, accuracy, or content of these third-party sites. Your use of third-party websites is at your own risk, and you should review their terms of service and privacy policies.</p>

        <h4>5 - Disclaimers and Limitation of Liability</h4>

        <h4>5.1 Warranty Disclaimer</h4>
        <p>The Website is provided on an "as-is" and "as available" basis, without any warranties of any kind, either express or implied. The Company does not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. You use the Website at your own risk.</p>

        <h4>5.2 Limitation of Liability</h4>

        <p>To the maximum extent permitted by law, the Company and its affiliates, officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages, including but not limited to damages for loss of profits, revenue, data, or use, incurred by you or any third party arising out of or in connection with:</p>
        <ul>
            <li>The use or inability to use the platform;</li>
            <li>Any content or materials accessed or obtained through the platform;</li>
            <li>Any conduct or content of any third party on the platform;</li>
            <li>Any unauthorized access, use, or alteration of your content or transmissions;</li>
            <li>Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through the platform by any third party;</li>
            <li>Any errors, inaccuracies, omissions, or other defects in any content or materials on the platform;</li>
            <li>Any interruptions or cessation of transmission to or from the platform;</li>
            <li>Any loss or damage to your computer system or data resulting from your use of the platform.</li>
            
        </ul>
        <p>This limitation of liability applies regardless of the legal theory under which such damages are sought, whether in contract, tort (including negligence), strict liability, or otherwise, even if advised of the possibility of such damages.</p>

        <h4>6 – Indemnification</h4>
        <p>You agree to indemnify, defend, and hold harmless the Company and its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from:</p>
        <ul>
            <li>Your use of the platform;</li>
            <li>Your violation of these Terms of Service;</li>
            <li>Your infringement or violation of any intellectual property or other right of any third party;</li>
            <li>Any content you upload, post, or transmit through the platform;</li>
            <li>Any third-party claims alleging that your use of the platform violates any applicable law or regulation.</li>
        </ul>

        <h4>7 - Modifications to the Terms of Service</h4>
        <p>We reserve the right to modify or update these Terms of Service at any time, with or without notice. Any changes to the Terms of Service will be effective immediately upon posting on the platform. Your continued use of the platform after any such changes constitutes your acceptance of the modified Terms of Service.</p>

        <h4>8- Governing Law and Dispute Resolution</h4>
        <p>These Terms of Service shall be governed by and construed in accordance with the Dubai court of law. Any dispute arising out of or relating to these Terms of Service or your use of the platform shall be resolved exclusively in the state or federal courts located within Dubai, and your consent to the jurisdiction of such courts.</p>

        <h4>9 - Severability</h4>
        <p>If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms of Service shall remain in full force and effect.</p>

        <br />
      </div>
  )
}


