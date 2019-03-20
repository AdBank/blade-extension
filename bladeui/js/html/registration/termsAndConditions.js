/* eslint-disable max-len */

"use strict";

const backButtonWithTitle = require("../common/backButtonWithTitle");
const header = require("../common/header");

const html = `
<div class="terms-and-conditions flex-column">
  ${header(backButtonWithTitle("Accept Terms & Conditions"))}
  <div class="text">
    <h2>PRIVACY POLICY</h2>
    <h3>1. Terms</h3>
    <p>
    1.1	We are committed to safeguarding the privacy of Blade’s visitors and users. As a principle, Blade may collect only what we need and will not share your personal information with any third parties other than our identity verification partner, if it applies. Even within Blade, access to your personal information is limited to a subset of employees who work on compliance and identity verification matters. Blade is the only data controller and processor.
    </p>
    <p>1.2	This policy applies where we are acting as a data controller with respect to the personal data of Blade’s users; in other words, where we determine the purposes and means of the use of that personal data.</p>
    <p>1.3	In this policy, "we", "us" and "our" refer to Adbank and Blade, respectively. (For more information about us, see Section 8.)</p>
    
    <h3>2. Use of Personal Data</h3>
    <p>2.1	In Section 2 we set out: <br> (a)	the general categories of personal data that we may use; <br> (b)	the purposes for which we may use personal data; and <br> (c)	the legal bases of the use of data.
    <br>
    2.2	We may use and store your account data (<b>"account data"</b>). The account data will include your age, gender, name, email address, location, photo ID, and photo of you. The account data may be used for the purposes of operating Blade, providing our services, ensuring the security of Blade and services, maintaining back-ups of our databases and communicating with you. Outside the account data you provide us, we will not collect any further personal data. The legal basis for this processing is for our legitimate interests, namely monitoring and improving our extension and services and targeting advertisements more effectively.
    </p>
    <p>2.3 	You will provide to us, immediately upon our notice of request, information that we, in our sole discretion, deem to be required to maintain compliance with any law, regulation or policy. Such documents include, but are not limited to, passports, driver’s licenses, utility bills, photographs of you, government identification cards, or sworn statements. Blade reserves its right to request documentation, described above, prior to activating your account at any of Blade and the Extension services, and any services, available through the Extension. Blade may refuse you access to the Extension should it have doubts as to validity, authenticity and genuineness of the documents, provided by you.</p>
    <p>2.4	We may use any of your account data identified in this policy where necessary for the establishment, exercise or defence of legal claims, whether in court proceedings or in an administrative or out-of-court procedure. The legal basis for this use of data is our legitimate interests, namely the protection and assertion of our legal rights, your legal rights and the legal rights of others.</p>
    <p>2.5	In addition to the specific purposes for which we may use your account data set out in this Section 2, we may also use any of your account data where such use is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.</p>

    <h3>3. Sharing Data to Others</h3>
    <p>3.1	We may disclose your collected account data to any member of our group of companies (this means our subsidiaries, our ultimate holding company and all its subsidiaries) insofar as reasonably necessary for the purposes, and on the legal bases, set out in this policy. Information about our group of companies can be found at <a class="link" id="link" href="https://www.adbank.network">www.adbank.network</a>.</p>


    <h3>4. Retaining & Deleting Data</h3>
    <p>4.1	This Section 4 sets out our data retention policies and procedure, which are designed to help ensure that we comply with our legal obligations in relation to the retention and deletion of personal data.</p>
    <p>4.2	We will retain your personal data as follows:<br> (a)	Personal data will be retained for as long as your account is active/registered to the Blade system OR if you change your account data information.</p>    
    <p>4.3	Notwithstanding the other provisions of this Section 4, we may retain your personal data where such retention is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.</p>

    <h3>5. Amendments</h3>
    <p>5.1	We may update this policy from time to time by publishing a new version on our website. It is your responsibility to check this policy for any updates. This policy is located on our website at blade.software  and on the Blade extension under Settings > Info > Terms and Conditions.</p>

    <h3>6. Your rights</h3>
    <p>6.1	In this Section 6, we have summarised the rights that you have under data protection law. </p>
    <p>6.2	Your principal rights under data protection law are: <br> (a)	the right to access; <br> (b)	the right to rectification; <br> (c)	the right to erasure; <br> (d)	the right to restrict processing; <br> (e)	the right to object to processing; <br> (f)	the right to data portability; <br> (g)	the right to complain to a supervisory authority; and <br> (h)	the right to withdraw consent. </p>
    <p>6.3	You have the right to confirmation as to whether or not we process your personal data and, where we do, access to the personal data, together with certain additional information. That additional information includes details of the purposes of the processing, the categories of personal data concerned and the recipients of the personal data. You may view your personal and stored data through the Blade extension by contacting us. This can be done under Settings, clicking your kyc verification status, and contacting us through the link at the bottom of the page.</p>
    <p>6.4	You have the right to have any inaccurate personal data about you rectified and, taking into account the purposes of the processing, to have any incomplete personal data about you completed.</p>
    <p>6.5	In some circumstances you have the right to the deletion of your personal data without undue delay. Those circumstances include: the personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed; you withdraw consent to consent-based processing; you object to the processing under certain rules of applicable data protection law; and the personal data have been unlawfully processed. However, there are exclusions of the right to erasure. The general exclusions include where processing is necessary: for exercising the right of freedom of expression and information; for compliance with a legal obligation; or for the establishment, exercise or defence of legal claims.</p>
    <p>6.6	In some circumstances you have the right to restrict the use of your personal data. Those circumstances are: you contest the accuracy of the personal data; processing is unlawful but you oppose erasure; we no longer need the personal data for the purposes of our use, but you require personal data for the establishment, exercise or defence of legal claims; and you have objected to processing, pending the verification of that objection. Where processing has been restricted on this basis, we may continue to store your personal data. However, we will only otherwise use it: with your consent; for the establishment, exercise or defence of legal claims; for the protection of the rights of another natural or legal person; or for reasons of important public interest.</p>
    <p>6.7	You have the right to object to our use of your personal data on grounds relating to your particular situation, but only to the extent that the legal basis for the use is that the use is necessary for: the performance of a task carried out in the public interest or in the exercise of any official authority vested in us; or the purposes of the legitimate interests pursued by us or by a third party. If you make such an objection, we will cease to process the personal information unless we can demonstrate compelling legitimate grounds for the use which override your interests, rights and freedoms, or the use is for the establishment, exercise or defence of legal claims.</p>
    <p>6.8  To the extent that the legal basis for our use of your personal data is: <br> (a)	consent; or <br> (b)	that the use is necessary for the performance of a contract to which you are party or in order to take steps at your request prior to entering into a contract, and such use is carried out by automated means, you have the right to receive your personal data from us in a structured, commonly used and machine-readable format. However, this right does not apply where it would adversely affect the rights and freedoms of others. <br>  </p>
    <p>6.9  If you consider that our use of your personal information infringes data protection laws, you have a legal right to lodge a complaint with a supervisory authority responsible for data protection. </p>
    <p>6.10  To the extent that the legal basis for our use of your personal information is consent, you have the right to withdraw that consent at any time. Withdrawal will affect your use of the Blade extension.</p>

    <h3>7. Security of your Personal Data</h3>
    <p>7.1  We will take reasonable technical and organizational precautions to prevent the loss, misuse, or alteration of your personal data. </p>
    <p>7.2 	We store and process your personal information on our servers, where our facilities or our service providers are located. We protect your information using physical, technical, and administrative security measures to reduce the risks of loss, misuse, unauthorized access, disclosure, and alteration. Some of the safeguards we use are firewalls and data encryption, physical access controls to our data centers, and information access authorization controls. We also authorize access to personal information only for those employees who require it to fulfill their job responsibilities. All of our physical, electronic, and procedural safeguards are designed to comply with applicable laws and regulations. Data may from time to time be stored also in other locations.</p>
    <p>7.3  You acknowledge that the transmission of information over the internet is inherently insecure, and we cannot guarantee the security of data sent over the internet.</p>
    <p>7.4  You are responsible for keeping the password you use for accessing your Blade account confidential; we will not ask you for your password (except when you log in to your Blade account).</p>

    <h3>8. Our Details</h3>
    <p>8.1  This website and the Blade extension is owned and operated by <i>Adbank Inc.</i></p>
    <p>8.2  We are registered in Ontario, Canada under Ontario Corporation registration number <i>0 0 2 5 9 7 7 5 7</i>, and our registered office is at <i>1 First Street, Collingwood, Ontario, Canada.</i></p>
    <p>8.3  Our principal place of business is at <i>1 First Street, Collingwood, Ontario, Canada.</i></p>
    <p>8.4  You can contact us: <br> (a)	by post, to 1 First Street, Collingwood, Ontario, Canada, L9Y1A1; or <br> (d)	by email, using hello@adbank.network. </p>

    <div class="form-wrap">
      <label>I Accept the Terms & Conditions
        <input type="checkbox" id="checkbox1">
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
  <button class="main-action-button" id="action-btn" disabled="true">ACCEPT</button>
</div>
`
;

module.exports = html;
