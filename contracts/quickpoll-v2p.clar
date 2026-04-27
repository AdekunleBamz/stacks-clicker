;; QuickPoll Contract v2p - Simplified for reliable testing
;; Contract 3 of 3 for Stacks Transaction Hub

;; ============================================
;; CONTRACT METADATA
;; ============================================
(define-constant CONTRACT-NAME "quickpoll")
(define-constant VERSION u6)

;; ============================================
;; CONFIGURATION
;; ============================================
(define-constant contract-owner tx-sender)
(define-constant interaction-fee u100) ;; 0.0001 STX = 100 microSTX

;; ============================================
;; ERROR CODES
;; ============================================
;; @desc Error code returned when a user tries to vote more than once
(define-constant ERR-ALREADY-VOTED (err u100))
;; @desc Error code returned when the STX transfer for the fee fails
(define-constant ERR-TRANSFER-FAILED (err u101))

;; @desc Error code returned when a non-owner tries to call an owner-only function
(define-constant ERR-NOT-OWNER (err u110))
;; @desc Error code returned when a caller is not authorized for an operation
(define-constant ERR-UNAUTHORIZED (err u111))
;; @desc Error code returned when an operation is performed on an unauthorized principal
(define-constant ERR-INVALID-PRINCIPAL (err u112))

;; ============================================
;; DATA VARIABLES
;; ============================================
(define-data-var total-votes uint u0)
(define-data-var yes-votes uint u0)
(define-data-var no-votes uint u0)
(define-data-var total-fees-collected uint u0)
(define-data-var last-activity-block uint u0)
(define-data-var unique-voters uint u0)

;; ============================================
;; DATA MAPS
;; ============================================
(define-map has-voted principal bool)
(define-map user-vote-count principal uint)

;; ============================================
;; PRIVATE FUNCTIONS
;; ============================================

;; Collect interaction fee
(define-private (collect-fee)
  (begin
    (try! (stx-transfer? interaction-fee tx-sender contract-owner))
    (var-set total-fees-collected (+ (var-get total-fees-collected) interaction-fee))
    (ok true)
  )
)

;; Track new voter
(define-private (track-new-voter)
  (if (is-eq (default-to u0 (map-get? user-vote-count tx-sender)) u0)
    (begin
      (var-set unique-voters (+ (var-get unique-voters) u1))
      true
    )
    false
  )
)

;; ============================================
;; READ-ONLY FUNCTIONS
;; ============================================

(define-read-only (get-version)
  VERSION
)

(define-read-only (get-contract-name)
  CONTRACT-NAME
)

(define-read-only (get-total-votes)
  (var-get total-votes)
)

(define-read-only (get-yes-votes)
  (var-get yes-votes)
)

(define-read-only (get-no-votes)
  (var-get no-votes)
)

(define-read-only (get-total-fees-collected)
  (var-get total-fees-collected)
)

(define-read-only (get-interaction-fee)
  interaction-fee
)

(define-read-only (get-unique-voters)
  (var-get unique-voters)
)

(define-read-only (get-last-activity-block)
  (var-get last-activity-block)
)

(define-read-only (has-user-voted (user principal))
  (default-to false (map-get? has-voted user))
)

(define-read-only (get-user-vote-count (user principal))
  (default-to u0 (map-get? user-vote-count user))
)

(define-read-only (get-results)
  {
    yes: (var-get yes-votes),
    no: (var-get no-votes),
    total: (var-get total-votes)
  }
)

(define-read-only (get-stats)
  {
    total-votes: (var-get total-votes),
    yes-votes: (var-get yes-votes),
    no-votes: (var-get no-votes),
    fees-collected: (var-get total-fees-collected),
    unique-voters: (var-get unique-voters)
  }
)

(define-read-only (get-contract-info)
  {
    name: CONTRACT-NAME,
    version: VERSION,
    total-votes: (var-get total-votes),
    yes-votes: (var-get yes-votes),
    no-votes: (var-get no-votes),
    unique-voters: (var-get unique-voters),
    fee: interaction-fee,
    last-activity: (var-get last-activity-block),
    owner: contract-owner
  }
)

;; ============================================
;; PUBLIC FUNCTIONS
;; ============================================

;; Vote yes - costs 0.0001 STX
(define-public (vote-yes)
  (let
    (
      (user-votes (get-user-vote-count tx-sender))
      (new-total (+ (var-get total-votes) u1))
      (new-yes (+ (var-get yes-votes) u1))
    )
    ;; Prevent duplicate votes from the same principal
    (asserts! (not (default-to false (map-get? has-voted tx-sender))) ERR-ALREADY-VOTED)
    ;; Track new voter
    (track-new-voter)
    ;; Collect fee
    (try! (collect-fee))
    ;; Record vote
    (map-set has-voted tx-sender true)
    (map-set user-vote-count tx-sender (+ user-votes u1))
    ;; Update state
    (var-set total-votes new-total)
    (var-set yes-votes new-yes)
    (var-set last-activity-block block-height)
    ;; Emit event
    (print {
      event: "vote",
      version: VERSION,
      voter: tx-sender,
      vote: "yes",
      total-votes: new-total,
      yes-votes: new-yes,
      block: block-height
    })
    (ok true)
  )
)

;; Vote no - costs 0.0001 STX
(define-public (vote-no)
  (let
    (
      (user-votes (get-user-vote-count tx-sender))
      (new-total (+ (var-get total-votes) u1))
      (new-no (+ (var-get no-votes) u1))
    )
    ;; Prevent duplicate votes from the same principal
    (asserts! (not (default-to false (map-get? has-voted tx-sender))) ERR-ALREADY-VOTED)
    ;; Track new voter
    (track-new-voter)
    ;; Collect fee
    (try! (collect-fee))
    ;; Record vote
    (map-set has-voted tx-sender true)
    (map-set user-vote-count tx-sender (+ user-votes u1))
    ;; Update state
    (var-set total-votes new-total)
    (var-set no-votes new-no)
    (var-set last-activity-block block-height)
    ;; Emit event
    (print {
      event: "vote",
      version: VERSION,
      voter: tx-sender,
      vote: "no",
      total-votes: new-total,
      no-votes: new-no,
      block: block-height
    })
    (ok true)
  )
)

;; Ping - costs 0.0001 STX
(define-public (ping)
  (begin
    (try! (collect-fee))
    (var-set last-activity-block block-height)
    (print {
      event: "ping",
      version: VERSION,
      user: tx-sender,
      block: block-height
    })
    (ok block-height)
  )
)
