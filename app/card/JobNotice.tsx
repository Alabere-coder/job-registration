import { Separator } from "@radix-ui/themes";

const JobNotice = () => {
  return (
    <div>
      <p className="font-medium my-3">Important Notifications</p>
      <small className="block">
        1. Gadgets will only be released on the presentation of this job card.
      </small>
      <small className="block">
        2. Customers should note that ALABERE INTEGRITY STRUCTURED SOLUTIONS
        will not be responsible for any job that is not collected 60 days from
        the date of its registration.
      </small>
      <small className="block">
        3. Any abandoned gadget not collected after 60 days will be considered
        forfeited (LOSE).
      </small>
      <small className="block">
        4. For dead Gadgets we do not have access to ascertain the functionality
        of other components inside them at the time of submitting for repaire,
        customers will bear full responsibilities for such gadgets.
      </small>
      <Separator my="6" size="4" />

      <div className="flex justify-between pt-4">
        <div className="max-w-40 flex items-center flex-col justify-center">
          <Separator my="3" size="4" />
          <small>Customer Signature</small>
        </div>
        <div className="max-w-40 flex items-center flex-col justify-center">
          <Separator my="3" size="4" />
          <small>Sales Rep. Signature</small>
        </div>
      </div>

      <h1 className="my-8 text-center">
        Gadget(s) will only be released on the presentation of this job card.
      </h1>
    </div>
  );
};

export default JobNotice;
