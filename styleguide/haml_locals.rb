# frozen_string_literal: true

@locals = {
  breadcrumb_links: [
    {
      url: 'https://www.citizensadvice.org.uk/benefits/',
      label: 'Benefits'
    },
    {
      url: 'https://www.citizensadvice.org.uk/benefits/benefits-introduction/',
      label: 'Benefits - introduction'
    },
    {
      url: 'https://www.citizensadvice.org.uk/benefits/benefits-introduction/what-benefits-can-i-get/',
      label: 'Benefit calculators: what benefits can you get'
    }
  ],

  notice: {
    type: 'important',
    title: 'Callout title: Important',
    body: '<p>The important callout should be used for any important snippet of text that has serious and/or legal implications if the client does not follow the advice.</p>'
  },

  root_path: 'root_path',

  sign_in_url: '/sign-in/url',
  search_action_url: '/the/search-action-url',

  banner: {
    label: 'Notice banner title',
    body: 'If you’re a Thomas Cook customer and you’re stuck abroad or want to get your money back, get help from the Civil Aviation Authority.'
  },

  radio: {
    name: 'radiogroup-1',
    label: 'Select an option',
    hint: 'There are two options',
    options: [{value: 'opt1', label: 'Option 1'}, {value: 'opt2', label: 'Option 2'}],
    error_message: 'This is an error message',
    has_error: true,
    optional: true
  },

  input: {
    name: 'inputABC',
    label: 'This is the label for the input',
    hint: 'This is the hint for the input',
    error_message: 'This is an error messsage',
    has_error: true,
    optional: true
  },

  contact_details: {
    title: 'Bail for Immigration Detainees',
    body: "<p>Telephone: 01234 567890</p><p>Monday to Thursday 8am to 1pm</p><p>Calls cost a lot of money</p><p><a href='http://link.to.the.website'>Link to the website</a></p>"
  },

  radio_has_error: true,
  radio_error_message: 'Please select an option',

  page_review_date: '21 September 2019',

  targetContent: {
    id: 'target-content-123',
    title: 'If you are a citizen of a country outside the EU, EEA or Switzerland',
    body: '<p>You should apply to the EU Settlement Scheme if both:</p>
<ul>
<li>you’re in the UK by 31 December 2020</li>
<li>you have family in the UK from the EU, EEA or Switzerland</li>
</ul>
<p>You need to apply to the scheme even if you have a permanent residence card as
it will not be valid after 31 December 2020.</p>
<p><a href="https://www.citizensadvice.org.uk/immigration/staying-in-the-uk-after-brexit/keeping-your-family-in-the-uk-after-brexit/">Check if you can apply to the EU Settlement Scheme</a></p>'
  },

  success_message: 'Thank you for your feedback'
}
